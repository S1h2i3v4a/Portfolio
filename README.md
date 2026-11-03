# Shivam Keshari — Cinematic 3D Developer Portfolio (2026)

**Live Deployment:** [https://portfolio-nine-ecru-zg2e05s2eq.vercel.app/](https://portfolio-nine-ecru-zg2e05s2eq.vercel.app/)  
**GitHub Repository:** [https://github.com/S1h2i3v4a/Portfolio](https://github.com/S1h2i3v4a/Portfolio)  
**Hackathon Event:** Portfolio Design Hackathon 2026 | Skillinf

---

## 🌟 Visual Direction & Cinematic 3D Architecture

An award-winning, production-grade 3D developer portfolio engineered for **Shivam Keshari** inspired by experimental digital art, high-end sci-fi interfaces, and the master storyboard design. Built with **Next.js 15 (App Router)**, **React 19**, **Three.js / WebGL**, **TypeScript**, and **Tailwind CSS v4**.

### 🎨 Argon Cinematic Design System
- **Deep Cosmic Canvas**: `#07090D` (Page) / `#090C11` (Sections) / `#0D1219` (Glass Panels)
- **Primary Accent**: Electric Lime (`#C7FF3E`)
- **Secondary Accent**: Technical Icy Cyan (`#68E7FF`)
- **Editorial Typography**: Warm Off-White (`#F4F7FB`) & Cool Slate (`#929CAA`)
- **Glassmorphic Paneling**: Subtle borders (`rgba(255,255,255,0.1)`), realistic refraction, and controlled depth shadows.

---

## 🌌 Section-by-Section 3D Breakdown

### 1. HERO — Zero-G Astronaut in Deep Space (`HeroAstronautScene.tsx`)
- **Visuals**: Procedural 3D spacefarer with articulated helmet, reflective planetary visor, pressurized suit, and PLSS backpack with glowing cyan/lime thrusters.
- **Atmosphere**: Curving planetary sphere with atmospheric blue/green limb glow, tilted planetary rings, slow-tumbling space asteroids, and 450+ twinkling cosmic stars.
- **Interactivity**: Dynamic pointer parallax responding to mouse coordinates with zero-g floating physics.

### 2. 3D QUANTUM VIEWER — Interactive Tensor Core (`QuantumViewerSection.tsx`)
- **Visuals**: Faceted quantum crystal core (nested octahedron/icosahedron) surrounded by dual counter-rotating metallic bronze and cyber-cyan orbital rings with orbiting data satellites.
- **Modes**: Real-time geometry switching between **Quantum** (faceted crystal refraction), **Wireframe** (glowing neon edges), and **Lattice** (geodesic atomic node network).
- **Controls**: Drag to rotate in 3D, scroll/pinch to zoom, carousel preset angle buttons (`Isometric`, `Equatorial`, `Top-Down`), and 1-click viewpoint reset.

### 3. ABOUT ME — Neoclassical Digital Sculpture (`HolographicBustScene.tsx`)
- **Visuals**: Classical sculpture (David bust aesthetic) with draped shoulders, chiseled jawline, and sculpted hair curls rendered with alabaster stone and glowing holographic wireframe.
- **Environment**: Multi-tiered cyberpunk cylindrical pedestal with glowing circular neon rings, rotating tilted orbital energy rings, and rising holographic spark particles.

### 4. MY SKILLS — 3D Interconnected Constellation (`SkillsConstellationScene.tsx`)
- **Visuals**: Central glowing `</>` core with dynamic light beams connected to surrounding satellite technology nodes (React, Next.js, TypeScript, Tailwind, Python, Three.js, Node.js, MongoDB, Java).
- **Interactivity**: Hovering over or clicking any glassmorphic technology card highlights the specific node in 3D and illuminates its energy pathway.

### 5. MY PROJECTS — Floating Cinematic Cards (`ProjectsSection.tsx`)
- **Visuals**: 4 floating glassmorphic cards with rich digital previews, category filters, and glowing green action buttons:
  1. **Skin Disease Detection**: AI-powered diagnosis with **94.2% Test Accuracy** on the benchmark **PH2 dataset (200 clinical images, 80/20 stratified split)** with OpenCV & EfficientNet-B0 (SocProS 2026 paper).
  2. **Celebration & Event Planner**: Milestone orchestrator, vendor task state machine, and real-time budget reconciliation ([Repository](https://github.com/S1h2i3v4a/Event-planner)).
  3. **Weather Forecast App & Mock Telemetry**: Meteorological telemetry with JSON schema generator & simulated HTTP status codes (200, 429, 500).
  4. **Financial Platform & AI Resume Analyzer**: MERN cash-flow analytics with MongoDB aggregation pipelines & JWT authentication.
- **Modals**: Full deep-dive case study drawers with interactive live simulators.

### 6. MY JOURNEY — Neon Conduit Timeline & 3D Trophy (`HolographicTrophyScene.tsx`)
- **Timeline**: Verified academic milestones (B.Tech CSE 2023–2027 at United Institute of Technology, Prayagraj, 300+ Java DSA problems on LeetCode/GFG, Hackathons, and SocProS research).
- **3D Trophy**: Classical chalice cup with fluted stem, sculpted handles, and inner glowing emerald gem on a neon pedestal surrounded by a rising double-helix of neon particles.

### 7. GET IN TOUCH — Holographic Envelope & Secure Dispatch (`HolographicEnvelopeScene.tsx`)
- **3D Envelope**: Floating translucent glass envelope with glowing seams, open triangular flap, floating digital letter with laser text lines, and cylindrical pedestal with scanning light beams.
- **Channels**: Verified email (`shivamkeshari1510@gmail.com`), Location (`Prayagraj, India`), LinkedIn, and GitHub with genuine client-side mailto dispatch.

### 8. FOOTER — Minimalist Colophon (`Footer.tsx`)
- Moniker `S1h2i3v4a`, copyright, verified social links, and smooth back-to-top trigger.

---

## ⚡ Performance & Accessibility
- **Zero Heavy External GLTF Assets**: All 3D scenes are procedurally generated using pure Three.js geometries, eliminating 404s, CORS issues, and heavy downloads.
- **Dynamic Lazy Loading**: Every Three.js canvas is dynamically imported with `next/dynamic` (`ssr: false`) to guarantee instant initial page loads (First Load JS: ~130 kB).
- **DPR Clamping**: Device pixel ratio clamped at 1.5x to sustain stable 60fps performance on high-density mobile and retina displays.
- **Reduced Motion Support**: Full 2D architectural blueprint vector fallbacks provided when `prefers-reduced-motion` is active or toggled via the navbar.

---

## 🚀 Quick Start (Local Development)

```bash
cd portfolio
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
npm run build
npm run start
```

---

## 👤 Author
- **Shivam Keshari**
- B.Tech in Computer Science & Engineering (2023 – 2027)
- United Institute of Technology, Prayagraj
- GitHub: [github.com/S1h2i3v4a](https://github.com/S1h2i3v4a)
- LinkedIn: [linkedin.com/in/shivam15keshari](https://www.linkedin.com/in/shivam15keshari/)
- X (Twitter): [@ShivamK11959343](https://x.com/ShivamK11959343)
- Event Planner Repository: [github.com/S1h2i3v4a/Event-planner](https://github.com/S1h2i3v4a/Event-planner)
