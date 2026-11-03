# Shivam Keshari — Developer Portfolio (2026)
Link:- https://portfolio-nine-ecru-zg2e05s2eq.vercel.app/
### Portfolio Design Hackathon 2026 | Skillinf

An extraordinary, production-grade personal developer portfolio engineered for the **Portfolio Design Hackathon 2026 by Skillinf**. Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide Icons, and an interactive 3D Architectural Tensor Lattice.

---

## 🌟 Key Highlights & Design Identity
- **Visual System**: Deep Obsidian (`#0A0B0E`), Graphite Cards (`#111318`, `#151821`), Warm Alabaster typography (`#F4F4F0`), and Surgical Electric Lime (`#D4FF00`) used with discipline.
- **Architectural 3D Canvas**: Interactive Geodesic & Tensor Lattice built in pure HTML5 Canvas 3D with depth-sorted rendering, orbital mouse physics, data-packet traversal, and a complete vector blueprint fallback for reduced-motion accessibility.
- **Engineering Case Studies**: Real problem statements and architectures with interactive in-modal sandboxes:
  1. *Skin Disease Detection & Severity Classification*: OpenCV black-hat hair artifact filter + CLAHE + Otsu ROI segmentation + EfficientNet-B0 transfer learning (co-authored SocProS conference paper).
  2. *Full-Stack Financial Expense & Budget Platform*: MERN stack with MongoDB aggregation pipelines, JWT authentication, and live ledger analytics.
  3. *Celebration & Event Planner*: Milestone orchestrator, vendor matrix, and budget reconciliation.
  4. *Dynamic Mock API Generator & Weather Telemetry Suite*: Configurable JSON schema builder, HTTP status error simulator (200, 429, 500), and debounced city weather telemetry.
- **Honest & Verifiable**: Zero fake percentage bars, zero fake client logos, zero fake form submissions (features verified mailto dispatch and copyable formatted outreach payload).
- **Single Source of Truth**: All profile info, skills, projects, and trajectory are typed and editable in `src/data/portfolioData.ts`.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js `v18.18+` or `v20+` or `v22+`
- npm, pnpm, or yarn

### 2. Installation
\`\`\`bash
cd portfolio
npm install
\`\`\`

### 3. Run Development Server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
\`\`\`bash
npm run build
npm run start
\`\`\`

---

## 📄 Adding Your Official Resume PDF
A configurable resume download button is built into the Hero section and Resume Preview modal. To use your official PDF resume:
1. Place your compiled PDF at `portfolio/public/resume.pdf`.
2. The button in the portfolio will immediately serve this file.
3. Visitors can also use the **Print / Save as PDF** feature directly from the in-app Resume Modal.

---

## 🌐 Deploying to Vercel (Free Tier)
1. Push this repository to GitHub:
   \`\`\`bash
   git init
   git add .
   git commit -m "feat: Shivam Keshari Award-Winning Developer Portfolio"
   git remote add origin https://github.com/S1h2i3v4a/portfolio-2026.git
   git push -u origin main
   \`\`\`
2. Sign in to [Vercel](https://vercel.com) using your GitHub account.
3. Click **Add New Project** and select this repository.
4. Set the Root Directory to `portfolio` if deploying from a monorepo, or leave as `./`.
5. Click **Deploy**. Vercel will build and assign a free `.vercel.app` live domain.

---

## 📁 Project Architecture
\`\`\`
portfolio/
├── public/                  # Static assets (favicons, resume.pdf)
├── src/
│   ├── app/
│   │   ├── globals.css      # Tailwind v4 theme tokens & custom scrollbars
│   │   ├── layout.tsx       # Root layout with Geist font & SEO OpenGraph metadata
│   │   └── page.tsx         # Main entry point wiring all sections & modals
│   ├── components/
│   │   ├── Navigation.tsx           # Sticky architectural header & mobile drawer
│   │   ├── HeroSection.tsx          # First viewport with editorial typography & CTAs
│   │   ├── ArchitecturalCanvas.tsx  # Interactive 3D Tensor Lattice with fallback
│   │   ├── AboutSection.tsx         # Identity narrative & 3 engineering pillars
│   │   ├── SkillsSection.tsx        # Capability matrix with interactive project trace
│   │   ├── ProjectsSection.tsx      # Case studies with category filters
│   │   ├── InteractiveDemos.tsx     # In-modal interactive sandboxes
│   │   ├── CaseStudyModal.tsx       # Deep-dive case study inspector drawer
│   │   ├── JourneySection.tsx       # Academic, research, & hackathon timeline
│   │   ├── ContactSection.tsx       # Verified channels & honest mailto dispatcher
│   │   ├── ResumeModal.tsx          # Structured printable CV sheet
│   │   ├── SourceCodeModal.tsx      # In-app Next.js source & config inspector
│   │   └── Footer.tsx               # Colophon & back to top
│   └── data/
│       └── portfolioData.ts         # Central typed source of truth
├── package.json
├── tsconfig.json
└── README.md
\`\`\`

---

## 👤 Author
- **Shivam Keshari**
- B.Tech Computer Science & Engineering (2023 – 2027)
- GitHub: [github.com/S1h2i3v4a](https://github.com/S1h2i3v4a)
- LinkedIn: [linkedin.com/in/shivam15keshari](https://www.linkedin.com/in/shivam15keshari/)
- X: [@ShivamK11959343](https://x.com/ShivamK11959343)
- Render Portfolio: [my-portfolio-od9l.onrender.com](https://my-portfolio-od9l.onrender.com/)
