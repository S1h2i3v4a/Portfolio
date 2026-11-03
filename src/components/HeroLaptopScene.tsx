'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

// -------------------------------------------------------------
// Interactive Parallax Controller
// -------------------------------------------------------------
function SceneRig({
  pointerRef,
  reducedMotion
}: {
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    if (reducedMotion) return;
    // Damped camera parallax tracking normalized pointer coordinates
    const targetX = pointerRef.current.x * 0.8;
    const targetY = 1.0 + pointerRef.current.y * 0.5;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.5, delta);
    camera.lookAt(0, 0.1, 0);
  });

  return null;
}

// -------------------------------------------------------------
// Futuristic 3D Cyber Laptop matching reference image
// -------------------------------------------------------------
function Laptop({
  pointerRef,
  reducedMotion
}: {
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const screenGlowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    if (!reducedMotion) {
      // Natural zero-G hover floating
      groupRef.current.position.y = 0.28 + Math.sin(t * 1.2) * 0.08;
      // Smooth tilt responding to pointer parallax
      const targetRotY = -0.22 + Math.sin(t * 0.35) * 0.08 + pointerRef.current.x * 0.3;
      const targetRotX = -0.14 + pointerRef.current.y * 0.2;
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3, delta);
    }

    // Subtle pulsing on the screen glowing emblem
    if (screenGlowRef.current) {
      const mat = screenGlowRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.85 + Math.sin(t * 3.0) * 0.15;
      }
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.14, -0.22, 0]} position={[0, 0.28, 0]}>
      {/* ================= Laptop Screen Section ================= */}
      <group position={[0, 0.82, -0.38]} rotation={[-0.18, 0, 0]}>
        {/* Outer Lid Body (Titanium Cyber Alloy) */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.55, 1.72, 0.09]} />
          <meshStandardMaterial
            color="#121b24"
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>

        {/* Back of Lid Accent Rim Bevel */}
        <mesh position={[0, 0, 0.048]}>
          <planeGeometry args={[2.53, 1.7]} />
          <meshBasicMaterial color="#09121a" />
        </mesh>

        {/* Glowing Cyber Rim Contour (Electric Cyan & Lime) */}
        <lineSegments position={[0, 0, -0.047]}>
          <edgesGeometry args={[new THREE.BoxGeometry(2.55, 1.72, 0.02)]} />
          <lineBasicMaterial color="#68e7ff" transparent opacity={0.65} />
        </lineSegments>

        {/* Glowing Neon Emblem on Outer Lid (`</>`) matching reference image */}
        <group position={[0, 0, -0.052]} rotation={[0, Math.PI, 0]}>
          <Text
            fontSize={0.52}
            color="#c7ff3e"
            anchorX="center"
            anchorY="middle"
            characters="</>"
          >
            {"</>"}
            <meshBasicMaterial color="#c7ff3e" />
          </Text>
          {/* Subtle glow halo plane behind the logo */}
          <mesh ref={screenGlowRef} position={[0, 0, -0.005]}>
            <circleGeometry args={[0.55, 32]} />
            <meshBasicMaterial
              color="#c7ff3e"
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* Inner Screen Display (Cyberpunk Terminal) */}
        <mesh position={[0, 0, 0.049]}>
          <planeGeometry args={[2.42, 1.58]} />
          <meshBasicMaterial color="#050e16" />
        </mesh>

        {/* Screen Content Text */}
        <group position={[0, 0.12, 0.052]}>
          <Text
            fontSize={0.46}
            color="#c7ff3e"
            anchorX="center"
            anchorY="middle"
            characters="</>"
          >
            {"</>"}
            <meshBasicMaterial color="#c7ff3e" />
          </Text>

          <Text
            position={[0, -0.45, 0]}
            fontSize={0.095}
            color="#68e7ff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.15}
          >
            BUILD • CREATE • INNOVATE
            <meshBasicMaterial color="#68e7ff" />
          </Text>
        </group>
      </group>

      {/* ================= Laptop Keyboard Base ================= */}
      <group position={[0, -0.1, 0.44]}>
        {/* Base Chassis Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.75, 0.12, 1.82]} />
          <meshStandardMaterial
            color="#1b2834"
            metalness={0.9}
            roughness={0.24}
          />
        </mesh>

        {/* Keyboard Well Inset */}
        <mesh position={[0, 0.062, -0.12]}>
          <boxGeometry args={[2.42, 0.015, 1.05]} />
          <meshStandardMaterial
            color="#0d1822"
            metalness={0.7}
            roughness={0.4}
          />
        </mesh>

        {/* Backlit Trackpad */}
        <mesh position={[0, 0.063, 0.54]}>
          <planeGeometry args={[0.92, 0.58]} />
          <meshStandardMaterial
            color="#14212c"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Trackpad glowing cyber border */}
        <lineSegments position={[0, 0.065, 0.54]} rotation={[-Math.PI / 2, 0, 0]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(0.92, 0.58)]} />
          <lineBasicMaterial color="#68e7ff" transparent opacity={0.6} />
        </lineSegments>

        {/* Glowing Chassis Edge Accent Strips */}
        <mesh position={[-1.38, 0, 0]}>
          <boxGeometry args={[0.02, 0.04, 1.7]} />
          <meshBasicMaterial color="#68e7ff" />
        </mesh>
        <mesh position={[1.38, 0, 0]}>
          <boxGeometry args={[0.02, 0.04, 1.7]} />
          <meshBasicMaterial color="#c7ff3e" />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// Animated Orbital Rings with Orbiting Satellites
// -------------------------------------------------------------
function OrbitRing({
  radius,
  color,
  rotation,
  speed,
  showSatellite = true,
  satelliteColor
}: {
  radius: number;
  color: string;
  rotation: [number, number, number];
  speed: number;
  showSatellite?: boolean;
  satelliteColor?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const satelliteRef = useRef<THREE.Mesh>(null);
  const satColor = satelliteColor || color;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * speed;
    }
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y += delta * 2;
    }
  });

  return (
    <group rotation={rotation}>
      <group ref={groupRef}>
        {/* Main Luminous Torus Ring */}
        <mesh>
          <torusGeometry args={[radius, 0.024, 16, 128]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2.2}
            roughness={0.15}
            metalness={0.8}
          />
        </mesh>

        {/* Orbiting Satellite Node Sphere */}
        {showSatellite && (
          <mesh ref={satelliteRef} position={[radius, 0, 0]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={satColor}
              emissiveIntensity={3.0}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// Floating Holographic Glass Cards with Glowing Borders
// -------------------------------------------------------------
function HolographicPanel({
  position,
  rotation = [0, 0, 0],
  width = 1.6,
  height = 0.85,
  title,
  subtitle,
  accentColor = '#c7ff3e',
  secondaryColor = '#68e7ff',
  children
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  title: string;
  subtitle?: string;
  accentColor?: string;
  secondaryColor?: string;
  children?: React.ReactNode;
}) {
  return (
    <Float speed={1.4} floatIntensity={0.22} rotationIntensity={0.1}>
      <group position={position} rotation={rotation}>
        {/* Glass Card Surface */}
        <mesh>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial
            color="#071722"
            transparent
            opacity={0.82}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Luminous Card Border Line */}
        <lineSegments position={[0, 0, 0.005]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
          <lineBasicMaterial color={secondaryColor} transparent opacity={0.65} />
        </lineSegments>

        {/* Card Header Title */}
        <Text
          position={[-width / 2 + 0.16, height / 2 - 0.18, 0.02]}
          fontSize={0.13}
          color={accentColor}
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.06}
        >
          {title}
          <meshBasicMaterial color={accentColor} />
        </Text>

        {/* Card Subtitle */}
        {subtitle && (
          <Text
            position={[-width / 2 + 0.16, height / 2 - 0.38, 0.02]}
            fontSize={0.082}
            color={secondaryColor}
            anchorX="left"
            anchorY="middle"
            letterSpacing={0.04}
          >
            {subtitle}
            <meshBasicMaterial color={secondaryColor} />
          </Text>
        )}

        {/* Optional Custom Embedded Visual Content */}
        {children}
      </group>
    </Float>
  );
}

// -------------------------------------------------------------
// 3D Holographic Wireframe Telemetry Globe matching reference
// -------------------------------------------------------------
function TelemetryGlobe({ position }: { position: [number, number, number] }) {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.45;
      globeRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <Float speed={1.3} floatIntensity={0.18}>
      <group position={position}>
        {/* Glass HUD panel backplane */}
        <mesh>
          <planeGeometry args={[1.3, 1.1]} />
          <meshBasicMaterial color="#071722" transparent opacity={0.78} side={THREE.DoubleSide} />
        </mesh>
        <lineSegments position={[0, 0, 0.005]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(1.3, 1.1)]} />
          <lineBasicMaterial color="#68e7ff" transparent opacity={0.5} />
        </lineSegments>

        {/* Wireframe Rotating Globe Sphere */}
        <group ref={globeRef} position={[0, 0.02, 0.15]}>
          <mesh>
            <sphereGeometry args={[0.34, 18, 14]} />
            <meshBasicMaterial color="#68e7ff" wireframe transparent opacity={0.75} />
          </mesh>
          {/* Latitude Equatorial Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.42, 0.012, 8, 36]} />
            <meshBasicMaterial color="#c7ff3e" transparent opacity={0.8} />
          </mesh>
        </group>

        {/* Telemetry Coordinate Label */}
        <Text
          position={[0, -0.42, 0.02]}
          fontSize={0.065}
          color="#929caa"
          anchorX="center"
          letterSpacing={0.08}
        >
          GLOBAL TELEMETRY • LIVE
          <meshBasicMaterial color="#929caa" />
        </Text>
      </group>
    </Float>
  );
}

// -------------------------------------------------------------
// Holographic Bar Chart Panel matching reference image
// -------------------------------------------------------------
function MetricBarChart({ position }: { position: [number, number, number] }) {
  const bars = useMemo(() => [0.22, 0.38, 0.52, 0.35, 0.68, 0.48, 0.76], []);

  return (
    <Float speed={1.5} floatIntensity={0.2}>
      <group position={position}>
        {/* Glass background */}
        <mesh>
          <planeGeometry args={[1.5, 0.95]} />
          <meshBasicMaterial color="#071722" transparent opacity={0.78} side={THREE.DoubleSide} />
        </mesh>
        <lineSegments position={[0, 0, 0.005]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(1.5, 0.95)]} />
          <lineBasicMaterial color="#c7ff3e" transparent opacity={0.55} />
        </lineSegments>

        {/* Title */}
        <Text
          position={[-0.6, 0.34, 0.02]}
          fontSize={0.082}
          color="#c7ff3e"
          anchorX="left"
          letterSpacing={0.08}
        >
          SYSTEM PERFORMANCE
          <meshBasicMaterial color="#c7ff3e" />
        </Text>

        {/* Animated Bar Columns */}
        <group position={[-0.48, -0.28, 0.02]}>
          {bars.map((h, i) => (
            <mesh key={i} position={[i * 0.16, h / 2, 0]}>
              <planeGeometry args={[0.09, h]} />
              <meshBasicMaterial
                color={i % 2 === 0 ? '#68e7ff' : '#c7ff3e'}
                transparent
                opacity={0.85}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}

// -------------------------------------------------------------
// Floating Space Rocks / Asteroids in Deep Space
// -------------------------------------------------------------
function FloatingDebris() {
  const rocks = useMemo(
    () => [
      { pos: [-4.2, -1.8, -3], rot: [0.5, 0.2, 0.8], scale: 0.32, speed: 0.12 },
      { pos: [4.4, 2.2, -4], rot: [0.2, 0.8, 0.4], scale: 0.28, speed: 0.18 },
      { pos: [-3.8, 2.5, -2.5], rot: [0.9, 0.1, 0.5], scale: 0.22, speed: 0.15 },
      { pos: [3.9, -2.2, -2.8], rot: [0.3, 0.6, 0.7], scale: 0.35, speed: 0.1 }
    ],
    []
  );

  return (
    <>
      {rocks.map((rock, idx) => (
        <Float key={idx} speed={1.2} floatIntensity={0.25} rotationIntensity={rock.speed * 2}>
          <mesh position={rock.pos as [number, number, number]} scale={rock.scale}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#1a2530"
              roughness={0.85}
              metalness={0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// -------------------------------------------------------------
// Complete 3D Scene Universe
// -------------------------------------------------------------
function Scene({
  pointerRef,
  reducedMotion
}: {
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  return (
    <>
      <color attach="background" args={['#050a10']} />

      {/* Dynamic Parallax Rig */}
      <SceneRig pointerRef={pointerRef} reducedMotion={reducedMotion} />

      {/* Cinematic Lighting System */}
      <ambientLight intensity={0.7} />
      {/* Cyan Key Light */}
      <pointLight position={[3.5, 3.8, 4.2]} color="#68e7ff" intensity={36} distance={16} />
      {/* Electric Lime Fill Light */}
      <pointLight position={[-4.2, -1.2, 2.5]} color="#c7ff3e" intensity={28} distance={14} />
      {/* Specular Rim Light from Behind */}
      <directionalLight position={[0, 4, -5]} color="#8ae8ff" intensity={1.2} />

      {/* Distant Cosmic Starfield */}
      <Stars
        radius={55}
        depth={40}
        count={1300}
        factor={3.4}
        fade
        speed={reducedMotion ? 0 : 0.45}
      />

      {/* Distant Planet Limb Horizon Curve in background */}
      <mesh position={[7.5, 3.2, -14]} rotation={[0.2, 0.4, 0]}>
        <sphereGeometry args={[6.8, 32, 32]} />
        <meshStandardMaterial
          color="#06121c"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      {/* Atmospheric Rim Glow on Planet */}
      <mesh position={[7.5, 3.2, -14.1]} scale={1.03}>
        <sphereGeometry args={[6.8, 32, 32]} />
        <meshBasicMaterial
          color="#2586a5"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Floating Rocky Asteroids */}
      <FloatingDebris />

      {/* Cyberpunk Pedestal Platform matching reference image */}
      <group position={[0, -1.48, 0]}>
        {/* Outer Base Tier */}
        <mesh receiveShadow>
          <cylinderGeometry args={[2.55, 2.75, 0.12, 64]} />
          <meshStandardMaterial
            color="#0c1822"
            metalness={0.92}
            roughness={0.22}
          />
        </mesh>

        {/* Mid Tier */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[2.2, 2.35, 0.09, 64]} />
          <meshStandardMaterial
            color="#14212d"
            metalness={0.88}
            roughness={0.25}
          />
        </mesh>

        {/* Concentric Glowing Neon Green Ring Inset */}
        <mesh position={[0, 0.13, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.7, 1.82, 64]} />
          <meshBasicMaterial color="#c7ff3e" side={THREE.DoubleSide} />
        </mesh>

        {/* Inner Glowing Core Emitter */}
        <mesh position={[0, 0.132, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.95, 1.05, 64]} />
          <meshBasicMaterial color="#68e7ff" side={THREE.DoubleSide} />
        </mesh>

        {/* Upward Hologram Projection Energy Beam */}
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[1.1, 1.6, 1.5, 32, 1, true]} />
          <meshBasicMaterial
            color="#c7ff3e"
            transparent
            opacity={0.085}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Central 3D Cyber Laptop */}
      <Laptop pointerRef={pointerRef} reducedMotion={reducedMotion} />

      {/* Triple Animated Orbital Rings */}
      {/* 1. Luminous Cyan Ring */}
      <OrbitRing
        radius={2.1}
        color="#68e7ff"
        rotation={[0.8, 0.22, 0.35]}
        speed={reducedMotion ? 0 : 0.16}
        showSatellite={true}
        satelliteColor="#ffffff"
      />

      {/* 2. Electric Lime Crossing Ring */}
      <OrbitRing
        radius={2.45}
        color="#c7ff3e"
        rotation={[1.25, 0.72, -0.42]}
        speed={reducedMotion ? 0 : -0.12}
        showSatellite={true}
        satelliteColor="#c7ff3e"
      />

      {/* 3. Deep Cyan Aquamarine Outer Ring */}
      <OrbitRing
        radius={2.75}
        color="#2586a5"
        rotation={[0.42, 1.15, 0.85]}
        speed={reducedMotion ? 0 : 0.08}
        showSatellite={true}
        satelliteColor="#68e7ff"
      />

      {/* ================= Floating Holographic UI Panels ================= */}
      {/* Panel 1: Top-Left (Code / Build / Innovate) */}
      <HolographicPanel
        position={[-3.1, 1.35, 0.2]}
        rotation={[0.08, 0.28, -0.04]}
        width={1.65}
        height={0.82}
        title="CODE / BUILD"
        subtitle="Ideas into reality"
        accentColor="#c7ff3e"
        secondaryColor="#68e7ff"
      />

      {/* Panel 2: Top-Right (>_ Full-Stack Developer) */}
      <HolographicPanel
        position={[3.1, 1.45, -0.4]}
        rotation={[-0.06, -0.25, 0.03]}
        width={1.75}
        height={0.82}
        title=">_ FULL-STACK"
        subtitle="Developer • Creator"
        accentColor="#c7ff3e"
        secondaryColor="#68e7ff"
      />

      {/* Panel 3: Mid-Right (Holographic Telemetry Globe) */}
      <TelemetryGlobe position={[3.3, 0.05, 0.1]} />

      {/* Panel 4: Bottom-Right (System Metrics Bar Chart) */}
      <MetricBarChart position={[2.85, -0.92, 0.4]} />
    </>
  );
}

// -------------------------------------------------------------
// Exported HeroLaptopScene with Pointer / Touch Event Bindings
// -------------------------------------------------------------
export default function HeroLaptopScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointerRef.current = { x, y };
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        camera={{ position: [0, 1.1, 8.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Scene pointerRef={pointerRef} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
