# Shivam Keshari — Developer Portfolio (2026)

**Live Deployment:** [https://portfolio-nine-ecru-zg2e05s2eq.vercel.app/](https://portfolio-nine-ecru-zg2e05s2eq.vercel.app/)  
**GitHub Repository:** [https://github.com/S1h2i3v4a/Portfolio](https://github.com/S1h2i3v4a/Portfolio)  
**Hackathon Event:** Portfolio Design Hackathon 2026 | Skillinf

---

## 🌟 Visual Identity & Engineering Architecture

An award-winning, production-grade developer portfolio engineered for Shivam Keshari. Built with **Next.js 15 (App Router)**, **React 19**, **Three.js / WebGL**, **TypeScript**, and **Tailwind CSS v4**.

- **Argon Visual Design System**:
  - Main Canvas Background: `#07090D`
  - Primary Sections: `#090C11`
  - Elevated Cards & Panels: `#0D1219`
  - Restrained Electric Lime Accent: `#C7FF3E`
  - Technical Icy Cyan Accent: `#68E7FF`
  - Editorial Alabaster Typography: `#F4F7FB`
- **Cinematic 3D Computational Artifact**:
  - Interactive Three.js WebGL scene featuring an inner glowing dodecahedron core, counter-rotating geodesic outer cage, atmospheric particle dust, dynamic point lights, and smooth pointer parallax.
  - Automatic context handling, device pixel ratio clamping (1.5x) for 60fps performance, and a comprehensive 2D vector blueprint fallback for users preferring reduced motion.
- **Verifiable Engineering Case Studies**:
  1. **Skin Disease Detection & Severity Classification**: OpenCV morphological black-hat hair filtering + CLAHE contrast enhancement + Otsu ROI lesion segmentation + EfficientNet-B0 convolutional network. Evaluated on the benchmark **PH2 dataset (200 clinical images: 80 Atypical Nevus, 80 Common Nevus, 40 Melanoma)** using an 80/20 stratified split, achieving **94.2% test accuracy** and **96.15% precision** (co-authored SocProS conference paper).
  2. **Full-Stack Financial Expense & Budget Platform**: MERN stack with multi-stage MongoDB aggregation pipelines (`$match`, `$group`, `$sort`), JWT authentication middleware, and optimistic React UI updates.
  3. **Celebration & Event Planner Web Application**: Chronological event milestone orchestrator, vendor task state-machine, and real-time budget delta reconciliation ([Repository](https://github.com/S1h2i3v4a/Event-planner)).
  4. **Dynamic Mock API Generator & Weather Telemetry Suite**: Custom JSON schema builder, HTTP status error simulator (200 OK, 429 Rate Limit, 500 Server Error), and debounced city weather telemetry client.
- **Honest & Verifiable**:
  - Real project repositories and metrics.
  - Zero fake skill percentage bars or artificial countdown timers.
  - Official compiled CV document bundled at `public/resume.pdf` with direct 1-click download.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js `v18.18+` or `v20+` or `v22+`
- npm, pnpm, or yarn

### 2. Installation
```bash
cd portfolio
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📄 Official Resume PDF
The official compiled resume document is bundled directly at `portfolio/public/resume.pdf`.
- **Hero CTA**: Clicking **DOWNLOAD RESUME** triggers immediate file download (`Shivam_Keshari_Resume.pdf`).
- **In-App Modal**: Visitors can inspect the verified resume summary and use the **Download PDF** or **Print Sheet** actions.

---

## 🌐 Deploying to Vercel

```bash
# Push updates to GitHub
git add .
git commit -m "fix(corrections): update event planner link, attach resume pdf, qualify skin disease test metrics, unify academic year, and clean up readme"
git push origin main
```
Vercel automatically triggers a clean continuous deployment from the `main` branch to [https://portfolio-nine-ecru-zg2e05s2eq.vercel.app/](https://portfolio-nine-ecru-zg2e05s2eq.vercel.app/).

---

## 📁 Project Architecture
```
portfolio/
├── public/
│   ├── resume.pdf           # Official verified curriculum vitae
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css      # Theme tokens & custom scrollbars
│   │   ├── layout.tsx       # Root layout with Geist font & SEO metadata
│   │   └── page.tsx         # Main entry point wiring sections & modals
│   ├── components/
│   │   ├── Navigation.tsx           # Sticky architectural header & mobile drawer
│   │   ├── HeroSection.tsx          # First viewport with editorial typography & CTAs
│   │   ├── CinematicThreeCanvas.tsx # WebGL Three.js 3D artifact with 2D blueprint fallback
│   │   ├── AboutSection.tsx         # Identity narrative & 3 engineering pillars
│   │   ├── SkillsSection.tsx        # Capability matrix with interactive project trace
│   │   ├── ProjectsSection.tsx      # Case studies with category filters & metric badges
│   │   ├── InteractiveDemos.tsx     # In-modal interactive sandboxes
│   │   ├── CaseStudyModal.tsx       # Deep-dive case study inspector drawer
│   │   ├── JourneySection.tsx       # Academic, research, & hackathon timeline
│   │   ├── ContactSection.tsx       # Verified channels & honest mailto dispatcher
│   │   ├── ResumeModal.tsx          # Structured printable CV sheet with PDF download
│   │   ├── SourceCodeModal.tsx      # In-app Next.js source & config inspector
│   │   └── Footer.tsx               # Colophon & back to top
│   └── data/
│       └── portfolioData.ts         # Central typed source of truth
├── package.json
├── tsconfig.json
└── README.md
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
