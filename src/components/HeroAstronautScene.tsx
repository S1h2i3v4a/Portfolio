'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroAstronautSceneProps {
  reducedMotion: boolean;
}

export function HeroAstronautScene({ reducedMotion }: HeroAstronautSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 560;

    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    try {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x07090d, 0.015);

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0.2, 7.8);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
    } catch {
      setWebGlSupported(false);
      return;
    }

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x101b2b, 1.8);
    scene.add(ambientLight);

    // Primary Neon Lime directional light (simulating star/planetary bounce)
    const limeLight = new THREE.DirectionalLight(0xc7ff3e, 2.2);
    limeLight.position.set(5, 4, 4);
    scene.add(limeLight);

    // Secondary Icy Cyan rim light
    const cyanLight = new THREE.DirectionalLight(0x68e7ff, 2.8);
    cyanLight.position.set(-6, -2, -3);
    scene.add(cyanLight);

    // Subtle point light at the astronaut's visor
    const visorLight = new THREE.PointLight(0xc7ff3e, 1.5, 6);
    visorLight.position.set(0, 0.8, 1.5);
    scene.add(visorLight);

    // --- MATERIALS ---
    const suitWhite = new THREE.MeshStandardMaterial({
      color: 0xdae2ec,
      roughness: 0.35,
      metalness: 0.2
    });

    const suitDark = new THREE.MeshStandardMaterial({
      color: 0x111923,
      roughness: 0.5,
      metalness: 0.4
    });

    const visorGoldDark = new THREE.MeshStandardMaterial({
      color: 0x05131d,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x08241b,
      emissiveIntensity: 0.3
    });

    const neonLimeMat = new THREE.MeshBasicMaterial({
      color: 0xc7ff3e
    });

    const neonCyanMat = new THREE.MeshBasicMaterial({
      color: 0x68e7ff
    });

    // --- PROCEDURAL 3D ASTRONAUT MODEL ---
    const astronautGroup = new THREE.Group();

    // 1. Helmet
    const helmetGeo = new THREE.SphereGeometry(0.68, 32, 24);
    const helmet = new THREE.Mesh(helmetGeo, suitWhite);
    helmet.position.set(0, 1.25, 0);
    astronautGroup.add(helmet);

    // Helmet ring collar
    const collarGeo = new THREE.TorusGeometry(0.62, 0.08, 12, 32);
    collarGeo.rotateX(Math.PI / 2);
    const collar = new THREE.Mesh(collarGeo, suitDark);
    collar.position.set(0, 0.72, 0);
    astronautGroup.add(collar);

    // Visor (curved reflective glass facing front)
    const visorGeo = new THREE.SphereGeometry(0.52, 32, 20, 0, Math.PI, 0, Math.PI);
    visorGeo.rotateY(Math.PI / 2);
    const visor = new THREE.Mesh(visorGeo, visorGoldDark);
    visor.position.set(0, 1.25, 0.22);
    visor.scale.set(1.05, 0.85, 0.7);
    astronautGroup.add(visor);

    // Glowing visor rim highlight
    const visorRimGeo = new THREE.TorusGeometry(0.48, 0.025, 8, 32);
    const visorRim = new THREE.Mesh(visorRimGeo, neonLimeMat);
    visorRim.position.set(0, 1.25, 0.45);
    visorRim.scale.set(1.0, 0.75, 1);
    astronautGroup.add(visorRim);

    // 2. Torso
    const torsoGeo = new THREE.CylinderGeometry(0.62, 0.48, 1.1, 16);
    const torso = new THREE.Mesh(torsoGeo, suitWhite);
    torso.position.set(0, 0.2, 0);
    astronautGroup.add(torso);

    // Chest control unit
    const chestPackGeo = new THREE.BoxGeometry(0.6, 0.45, 0.2);
    const chestPack = new THREE.Mesh(chestPackGeo, suitDark);
    chestPack.position.set(0, 0.25, 0.38);
    astronautGroup.add(chestPack);

    // Chest indicator lights (Neon Lime & Cyan)
    const ledGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const ledLime = new THREE.Mesh(ledGeo, neonLimeMat);
    ledLime.position.set(-0.16, 0.35, 0.49);
    astronautGroup.add(ledLime);

    const ledCyan = new THREE.Mesh(ledGeo, neonCyanMat);
    ledCyan.position.set(-0.06, 0.35, 0.49);
    astronautGroup.add(ledCyan);

    // Oxygen hoses connecting collar to chest unit
    const hoseCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.25, 0.7, 0.2),
      new THREE.Vector3(-0.35, 0.45, 0.35),
      new THREE.Vector3(-0.15, 0.25, 0.48)
    ]);
    const hoseGeo = new THREE.TubeGeometry(hoseCurve, 16, 0.03, 8, false);
    const hose = new THREE.Mesh(hoseGeo, suitDark);
    astronautGroup.add(hose);

    // 3. Backpack (Life Support PLSS)
    const plssGeo = new THREE.BoxGeometry(0.9, 1.2, 0.42);
    const plss = new THREE.Mesh(plssGeo, suitDark);
    plss.position.set(0, 0.35, -0.42);
    astronautGroup.add(plss);

    // Dual thrusters on backpack
    const thrusterGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.25, 12);
    const thrusterLeft = new THREE.Mesh(thrusterGeo, suitDark);
    thrusterLeft.position.set(-0.3, 0.95, -0.45);
    astronautGroup.add(thrusterLeft);

    const thrusterRight = new THREE.Mesh(thrusterGeo, suitDark);
    thrusterRight.position.set(0.3, 0.95, -0.45);
    astronautGroup.add(thrusterRight);

    // Thruster exhaust glow
    const exhaustGeo = new THREE.ConeGeometry(0.1, 0.3, 8);
    exhaustGeo.rotateX(Math.PI);
    const exhaustLeft = new THREE.Mesh(exhaustGeo, neonCyanMat);
    exhaustLeft.position.set(-0.3, 1.15, -0.45);
    astronautGroup.add(exhaustLeft);

    const exhaustRight = new THREE.Mesh(exhaustGeo, neonLimeMat);
    exhaustRight.position.set(0.3, 1.15, -0.45);
    astronautGroup.add(exhaustRight);

    // 4. Arms (Posed floating gracefully)
    // Left Arm
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.65, 0.55, 0);

    const shoulderGeo = new THREE.SphereGeometry(0.24, 12, 12);
    const leftShoulder = new THREE.Mesh(shoulderGeo, suitDark);
    leftArmGroup.add(leftShoulder);

    const armSegmentGeo = new THREE.CylinderGeometry(0.16, 0.14, 0.6, 12);
    const leftUpperArm = new THREE.Mesh(armSegmentGeo, suitWhite);
    leftUpperArm.position.set(-0.15, -0.3, 0.1);
    leftUpperArm.rotation.set(0.2, 0, 0.35);
    leftArmGroup.add(leftUpperArm);

    const leftForearm = new THREE.Mesh(armSegmentGeo, suitWhite);
    leftForearm.position.set(-0.25, -0.75, 0.35);
    leftForearm.rotation.set(0.6, 0.2, 0.5);
    leftArmGroup.add(leftForearm);

    const gloveGeo = new THREE.BoxGeometry(0.18, 0.22, 0.14);
    const leftGlove = new THREE.Mesh(gloveGeo, suitDark);
    leftGlove.position.set(-0.32, -1.05, 0.55);
    leftArmGroup.add(leftGlove);

    astronautGroup.add(leftArmGroup);

    // Right Arm (Reaching gently forward towards camera)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.65, 0.55, 0);

    const rightShoulder = new THREE.Mesh(shoulderGeo, suitDark);
    rightArmGroup.add(rightShoulder);

    const rightUpperArm = new THREE.Mesh(armSegmentGeo, suitWhite);
    rightUpperArm.position.set(0.18, -0.28, 0.18);
    rightUpperArm.rotation.set(-0.3, 0, -0.4);
    rightArmGroup.add(rightUpperArm);

    const rightForearm = new THREE.Mesh(armSegmentGeo, suitWhite);
    rightForearm.position.set(0.28, -0.65, 0.45);
    rightForearm.rotation.set(-0.6, -0.3, -0.3);
    rightArmGroup.add(rightForearm);

    const rightGlove = new THREE.Mesh(gloveGeo, suitDark);
    rightGlove.position.set(0.35, -0.95, 0.7);
    rightArmGroup.add(rightGlove);

    astronautGroup.add(rightArmGroup);

    // 5. Waist & Legs (Zero-g relaxed floating position)
    const waistGeo = new THREE.TorusGeometry(0.48, 0.08, 12, 24);
    waistGeo.rotateX(Math.PI / 2);
    const waist = new THREE.Mesh(waistGeo, suitDark);
    waist.position.set(0, -0.35, 0);
    astronautGroup.add(waist);

    const legGeo = new THREE.CylinderGeometry(0.2, 0.16, 0.7, 12);

    // Left leg
    const leftThigh = new THREE.Mesh(legGeo, suitWhite);
    leftThigh.position.set(-0.3, -0.75, 0.1);
    leftThigh.rotation.set(0.3, 0, 0.15);
    astronautGroup.add(leftThigh);

    const leftCalf = new THREE.Mesh(legGeo, suitWhite);
    leftCalf.position.set(-0.38, -1.35, 0.35);
    leftCalf.rotation.set(0.65, 0, 0.1);
    astronautGroup.add(leftCalf);

    const bootGeo = new THREE.BoxGeometry(0.22, 0.22, 0.45);
    const leftBoot = new THREE.Mesh(bootGeo, suitDark);
    leftBoot.position.set(-0.4, -1.75, 0.55);
    leftBoot.rotation.set(0.2, 0, 0);
    astronautGroup.add(leftBoot);

    // Right leg
    const rightThigh = new THREE.Mesh(legGeo, suitWhite);
    rightThigh.position.set(0.3, -0.78, -0.05);
    rightThigh.rotation.set(-0.15, 0, -0.2);
    astronautGroup.add(rightThigh);

    const rightCalf = new THREE.Mesh(legGeo, suitWhite);
    rightCalf.position.set(0.38, -1.4, -0.05);
    rightCalf.rotation.set(0.25, 0, -0.15);
    astronautGroup.add(rightCalf);

    const rightBoot = new THREE.Mesh(bootGeo, suitDark);
    rightBoot.position.set(0.42, -1.8, 0.1);
    rightBoot.rotation.set(0.1, 0, -0.1);
    astronautGroup.add(rightBoot);

    // Position and scale astronaut in scene
    astronautGroup.position.set(0.4, 0.1, 0.6);
    astronautGroup.rotation.set(0.1, -0.25, 0.05);
    astronautGroup.scale.set(1.15, 1.15, 1.15);
    scene.add(astronautGroup);

    // --- BACKGROUND: PLANETARY CURVATURE & RINGS ---
    const planetGroup = new THREE.Group();
    planetGroup.position.set(8.5, -10.5, -9.0);

    const planetGeo = new THREE.SphereGeometry(15, 48, 48);
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x071b28,
      roughness: 0.85,
      metalness: 0.1,
      emissive: 0x05131f,
      emissiveIntensity: 0.4
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planet);

    // Atmospheric rim glow
    const atmosGeo = new THREE.SphereGeometry(15.4, 48, 48);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x68e7ff,
      wireframe: true,
      transparent: true,
      opacity: 0.09,
      blending: THREE.AdditiveBlending
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    planetGroup.add(atmosphere);

    // Planetary Rings
    const ringGeo = new THREE.RingGeometry(18, 26, 64);
    ringGeo.rotateX(Math.PI / 2.3);
    ringGeo.rotateY(Math.PI / 8);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc7ff3e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12,
      wireframe: true
    });
    const planetRing = new THREE.Mesh(ringGeo, ringMat);
    planetGroup.add(planetRing);

    scene.add(planetGroup);

    // --- FLOATING ASTEROIDS / DEBRIS ---
    const asteroidGroup = new THREE.Group();
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: 0x1f2733,
      roughness: 0.9,
      metalness: 0.1
    });

    const asteroids: { mesh: THREE.Mesh; rotX: number; rotY: number; speed: number }[] = [];
    const asteroidCoords = [
      { x: -3.6, y: 1.8, z: -1.5, s: 0.35 },
      { x: 3.2, y: -1.6, z: 0.5, s: 0.45 },
      { x: -2.8, y: -2.2, z: -0.8, s: 0.28 },
      { x: 3.8, y: 2.2, z: -2.0, s: 0.55 },
      { x: 1.2, y: -3.0, z: -1.2, s: 0.3 }
    ];

    asteroidCoords.forEach((coord, i) => {
      const rockGeo = new THREE.DodecahedronGeometry(coord.s, 1);
      // Jitter vertices for organic rock appearance
      const posAttr = rockGeo.attributes.position;
      for (let j = 0; j < posAttr.count; j++) {
        const vx = posAttr.getX(j);
        const vy = posAttr.getY(j);
        const vz = posAttr.getZ(j);
        const noise = (Math.sin(j * 3.7 + i) * 0.15 + 1);
        posAttr.setXYZ(j, vx * noise, vy * noise, vz * noise);
      }
      rockGeo.computeVertexNormals();

      const rock = new THREE.Mesh(rockGeo, asteroidMat);
      rock.position.set(coord.x, coord.y, coord.z);
      asteroidGroup.add(rock);
      asteroids.push({
        mesh: rock,
        rotX: (Math.random() - 0.5) * 0.015,
        rotY: (Math.random() - 0.5) * 0.015,
        speed: 0.5 + Math.random() * 0.5
      });
    });

    scene.add(asteroidGroup);

    // --- COSMIC STARFIELD & NEON DUST PARTICLES ---
    const starCount = 450;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 40;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 40;
      starPositions[i3 + 2] = -5 - Math.random() * 30;

      // Color mix: mostly white, some icy cyan and electric lime sparks
      const rnd = Math.random();
      if (rnd > 0.85) {
        // Lime #C7FF3E
        starColors[i3] = 0.78;
        starColors[i3 + 1] = 1.0;
        starColors[i3 + 2] = 0.24;
      } else if (rnd > 0.65) {
        // Cyan #68E7FF
        starColors[i3] = 0.41;
        starColors[i3 + 1] = 0.91;
        starColors[i3 + 2] = 1.0;
      } else {
        // Star white
        starColors[i3] = 0.95;
        starColors[i3 + 1] = 0.97;
        starColors[i3 + 2] = 1.0;
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Drifting neon lime energy motes around the astronaut
    const moteCount = 60;
    const moteGeo = new THREE.BufferGeometry();
    const motePositions = new Float32Array(moteCount * 3);
    for (let i = 0; i < moteCount; i++) {
      motePositions[i * 3] = (Math.random() - 0.5) * 6;
      motePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      motePositions[i * 3 + 2] = (Math.random() - 0.5) * 4 + 0.5;
    }
    moteGeo.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));
    const moteMat = new THREE.PointsMaterial({
      color: 0xc7ff3e,
      size: 0.08,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const motes = new THREE.Points(moteGeo, moteMat);
    scene.add(motes);

    // --- MOUSE PARALLAX TRACKING ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.35;
      targetY = y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // --- 60FPS RAF LOOP ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      // Zero-G Gentle Floating Dynamics
      const bobY = Math.sin(elapsedTime * 0.85) * 0.12;
      const bobX = Math.cos(elapsedTime * 0.65) * 0.06;
      astronautGroup.position.y = 0.1 + bobY;
      astronautGroup.position.x = 0.4 + bobX;

      // Parallax rotation
      astronautGroup.rotation.y = -0.25 + mouseX * 0.6;
      astronautGroup.rotation.x = 0.1 - mouseY * 0.45;
      astronautGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.04;

      // Gentle movement for floating arms
      leftArmGroup.rotation.z = Math.sin(elapsedTime * 0.9) * 0.08;
      rightArmGroup.rotation.z = -Math.cos(elapsedTime * 0.9) * 0.08;

      // Slowly rotate planetary curvature and rings
      planetGroup.rotation.y = elapsedTime * 0.02;
      atmosphere.rotation.y = elapsedTime * 0.035;

      // Tumbling asteroids
      asteroids.forEach((ast) => {
        ast.mesh.rotation.x += ast.rotX * ast.speed;
        ast.mesh.rotation.y += ast.rotY * ast.speed;
      });

      // Drifting stars & motes
      starPoints.rotation.y = elapsedTime * 0.005;
      motes.rotation.y = -elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Clean disposal
      renderer.dispose();
      helmetGeo.dispose();
      collarGeo.dispose();
      visorGeo.dispose();
      visorRimGeo.dispose();
      torsoGeo.dispose();
      chestPackGeo.dispose();
      hoseGeo.dispose();
      plssGeo.dispose();
      planetGeo.dispose();
      ringGeo.dispose();
      starGeo.dispose();
      moteGeo.dispose();
      suitWhite.dispose();
      suitDark.dispose();
      visorGoldDark.dispose();
      neonLimeMat.dispose();
      neonCyanMat.dispose();
    };
  }, [reducedMotion]);

  if (!webGlSupported || reducedMotion) {
    return (
      <div className="w-full h-[460px] sm:h-[540px] lg:h-[620px] bg-[#07090D] border border-white/10 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Architectural 2D Vector Blueprint Fallback */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 65% 50%, rgba(199,255,62,0.15) 0%, transparent 60%)`
          }}
        />
        <svg viewBox="0 0 320 320" className="w-64 h-64 text-[#C7FF3E] stroke-current fill-none">
          <circle cx="160" cy="160" r="140" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <circle cx="160" cy="160" r="100" strokeWidth="1.2" opacity="0.6" />
          <ellipse cx="160" cy="160" rx="130" ry="45" strokeWidth="1.5" transform="rotate(-25 160 160)" stroke="#68E7FF" opacity="0.8" />
          <circle cx="160" cy="120" r="32" strokeWidth="2" />
          <path d="M 140 120 Q 160 140 180 120" strokeWidth="1.8" />
          <rect x="135" y="155" width="50" height="60" rx="6" strokeWidth="2" />
          <path d="M 120 170 L 135 160 M 200 160 L 215 170" strokeWidth="2" />
        </svg>
        <span className="font-mono text-xs text-[#C7FF3E] mt-3 tracking-widest uppercase">
          ASTRONAUT ZERO-G TELEMETRY [2D VECTOR MODE]
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[460px] sm:h-[540px] lg:h-[640px] relative flex items-center justify-center"
      aria-label="Interactive 3D Astronaut Space Scene"
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Futuristic telemetry annotations */}
      <div className="absolute top-4 right-4 pointer-events-none font-mono text-[10px] text-[#929CAA] bg-[#07090D]/80 border border-white/10 px-2.5 py-1 backdrop-blur-sm flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3E] animate-pulse" />
        <span>ORBIT: LEO // 420KM</span>
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-none font-mono text-[10px] text-[#697483] bg-[#07090D]/80 border border-white/10 px-2.5 py-1 backdrop-blur-sm">
        INTERACTIVE POINTER PARALLAX ENABLED
      </div>
    </div>
  );
}
