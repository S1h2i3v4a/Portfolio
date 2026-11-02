// src/data/portfolioData.ts
// Single source of truth for Shivam Keshari's Award-Winning Developer Portfolio
// Portfolio Design Hackathon 2026 | Skillinf

export interface ProjectArchitectureStep {
  step: string;
  label: string;
  detail: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'AI & Computer Vision' | 'Full-Stack Web' | 'Developer Tools';
  featured: boolean;
  timeline: string;
  problem: string;
  solution: string;
  intendedUsers: string;
  keyFeatures: string[];
  techStack: string[];
  technicalDecisions: string;
  architectureSteps: ProjectArchitectureStep[];
  githubUrl: string;
  liveUrl: string | null;
  interactiveType: 'cv-pipeline' | 'budget-sim' | 'event-sim' | 'api-sim';
}

export interface SkillItem {
  name: string;
  context: string;
  relatedProjects: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  index: string;
  description: string;
  skills: SkillItem[];
}

export interface JourneyMilestone {
  id: string;
  period: string;
  tag: string;
  title: string;
  organization: string;
  description: string;
  highlights: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Shivam Keshari',
    handle: 'SHIVAM.K // [2026]',
    role: 'Full-Stack Developer & Applied AI Systems Builder',
    academicStatus: 'B.Tech in Computer Science & Engineering (2023 – 2027)',
    institution: 'United Institute of Technology, Prayagraj',
    location: 'Prayagraj, Uttar Pradesh, India',
    statusBadge: 'Open to Software Engineering Internships & Collaborative Builds',
    headline: 'Engineering Practical Full-Stack Systems, Algorithmic Rigor & Applied AI Workflows.',
    subheadline:
      'Computer Science undergraduate focused on translating complex problem statements into resilient web architectures, Java-driven algorithmic solutions, and accessible computer vision pipelines.',
    resumePath: '/resume.pdf',
    links: {
      github: 'https://github.com/S1h2i3v4a',
      linkedin: 'https://www.linkedin.com/in/shivam15keshari/',
      x: 'https://x.com/ShivamK11959343',
      previousPortfolio: 'https://my-portfolio-od9l.onrender.com/'
    }
  },

  aboutPillars: [
    {
      id: '01',
      title: 'Full-Stack Web Architecture',
      subtitle: 'End-to-End Implementation',
      description:
        'Designing and shipping complete web applications using React, Next.js, Node.js, Express, and MongoDB. Focused on clean state management, modular REST APIs, and responsive user interfaces.',
      metrics: 'MERN + Next.js App Router',
      icon: 'Layers'
    },
    {
      id: '02',
      title: 'Algorithmic Problem Solving',
      subtitle: 'Java DSA & System Design',
      description:
        'Consistent, disciplined practice in Data Structures & Algorithms using Java. Experienced with trees, graph traversals, dynamic programming, and foundational Low-Level & High-Level Design.',
      metrics: '300+ DSA Problems Solved (Striver A2Z)',
      icon: 'Cpu'
    },
    {
      id: '03',
      title: 'Applied AI & Computer Vision',
      subtitle: 'Deep Learning in Production',
      description:
        'Bridging machine learning models with practical interfaces—combining OpenCV image preprocessing pipelines with Convolutional Neural Networks (EfficientNet) for diagnostic classification.',
      metrics: 'EfficientNet + OpenCV Pipelines',
      icon: 'Activity'
    }
  ],

  philosophyQuote:
    'I believe software engineering is learned through deliberate implementation—writing verifiable code, debugging real edge cases, and structuring systems that remain maintainable after deployment.',

  skillCategories: [
    {
      id: 'languages',
      title: 'Programming Languages',
      index: 'CAP // 01',
      description: 'Core languages used for data structures, backend services, and ML scripts.',
      skills: [
        { name: 'Java', context: 'Primary language for 300+ DSA problems, OOP, & System Design', relatedProjects: ['mock-weather'] },
        { name: 'Python', context: 'Deep learning pipelines, OpenCV image processing, & scripting', relatedProjects: ['skin-disease'] },
        { name: 'JavaScript (ES6+)', context: 'Asynchronous full-stack logic, DOM manipulation, & Node services', relatedProjects: ['expense-tracker', 'event-planner', 'mock-weather'] },
        { name: 'TypeScript', context: 'Strict type-safe frontend components & schema definitions', relatedProjects: ['mock-weather'] },
        { name: 'SQL', context: 'Relational schema design, joins, & query optimization', relatedProjects: ['expense-tracker'] }
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend Engineering',
      index: 'CAP // 02',
      description: 'Building accessible, responsive, and high-contrast interfaces.',
      skills: [
        { name: 'React.js', context: 'Component architecture, custom hooks, & interactive state', relatedProjects: ['skin-disease', 'expense-tracker', 'event-planner', 'mock-weather'] },
        { name: 'Next.js (App Router)', context: 'Server/Client component orchestration & SEO optimization', relatedProjects: ['mock-weather'] },
        { name: 'Tailwind CSS', context: 'Design token systems, responsive grids, & dark UI styling', relatedProjects: ['expense-tracker', 'event-planner', 'mock-weather'] },
        { name: 'HTML5 & CSS3', context: 'Semantic markup, accessibility, & fluid layouts', relatedProjects: ['event-planner', 'mock-weather'] },
        { name: 'Three.js / Canvas 3D', context: 'Selective interactive geometric visualizations & mathematical lattices', relatedProjects: ['mock-weather'] }
      ]
    },
    {
      id: 'backend',
      title: 'Backend & Databases',
      index: 'CAP // 03',
      description: 'Server-side API engineering, authentication, and persistent storage.',
      skills: [
        { name: 'Node.js & Express.js', context: 'RESTful API routing, middleware chains, & controller logic', relatedProjects: ['expense-tracker', 'event-planner'] },
        { name: 'MongoDB & Mongoose', context: 'Document schemas, aggregation pipelines, & indexing', relatedProjects: ['expense-tracker', 'event-planner'] },
        { name: 'REST API Design', context: 'Structured JSON contracts, status codes, & error handling', relatedProjects: ['expense-tracker', 'event-planner', 'mock-weather'] },
        { name: 'JWT Authentication', context: 'Role-based access control & protected route middleware', relatedProjects: ['expense-tracker', 'event-planner'] }
      ]
    },
    {
      id: 'aiml',
      title: 'AI / ML & Computer Vision',
      index: 'CAP // 04',
      description: 'Image preprocessing, neural network training, and model evaluation.',
      skills: [
        { name: 'EfficientNet & CNNs', context: 'Transfer learning & multi-class dermatological lesion grading', relatedProjects: ['skin-disease'] },
        { name: 'OpenCV', context: 'Artifact removal, hair masking, CLAHE contrast & segmentation', relatedProjects: ['skin-disease'] },
        { name: 'TensorFlow / Keras', context: 'Model training loops, callbacks, & evaluation metrics', relatedProjects: ['skin-disease'] },
        { name: 'Scikit-Learn & NumPy', context: 'Confusion matrices, F1 evaluation, & array transformations', relatedProjects: ['skin-disease'] }
      ]
    },
    {
      id: 'cs-tools',
      title: 'CS Fundamentals & Tooling',
      index: 'CAP // 05',
      description: 'Core computer science foundations and modern deployment workflows.',
      skills: [
        { name: 'Data Structures & Algorithms', context: 'Trees, Graphs, DP, Heaps, Tries & Greedy algorithms in Java', relatedProjects: ['mock-weather'] },
        { name: 'Low-Level & High-Level Design', context: 'SOLID principles, design patterns, & scalable system blocks', relatedProjects: ['expense-tracker', 'mock-weather'] },
        { name: 'Git & GitHub', context: 'Version control, branching strategies, & repository hygiene', relatedProjects: ['skin-disease', 'expense-tracker', 'event-planner', 'mock-weather'] },
        { name: 'Vercel & Render', context: 'Cloud deployment, environment configuration, & CI previews', relatedProjects: ['event-planner', 'mock-weather'] }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: 'skin-disease',
      index: 'CASE // 01',
      title: 'Skin Disease Detection & Severity Classification',
      subtitle: 'Computer Vision & Deep Learning Diagnostic Pipeline',
      category: 'AI & Computer Vision',
      featured: true,
      timeline: '2025 – 2026 (Research & Applied Build)',
      problem:
        'Early visual screening of dermatological conditions often suffers from noisy clinical images (hair occlusion, uneven lighting) and lacks automated severity-stage estimation beyond basic binary classification.',
      solution:
        'Engineered a multi-stage computer vision and deep learning pipeline combining OpenCV morphological preprocessing with an EfficientNet Convolutional Neural Network to classify dermatological lesions and grade their severity stage.',
      intendedUsers: 'Clinical researchers, medical students, and point-of-care screening evaluation workflows.',
      keyFeatures: [
        'Automated OpenCV preprocessing: black-hat morphological filtering for hair artifact removal and CLAHE contrast enhancement.',
        'Lesion boundary segmentation to isolate regions of interest (ROI) from surrounding healthy skin.',
        'Fine-tuned EfficientNet transfer learning model for multi-class skin condition classification.',
        'Severity stage grading module evaluating lesion morphology, color variance, and affected area ratio.',
        'Co-authored academic research paper submitted to the SocProS conference workflow.'
      ],
      techStack: ['Python', 'TensorFlow / Keras', 'EfficientNet', 'OpenCV', 'NumPy', 'Scikit-Learn', 'React UI'],
      technicalDecisions:
        'Chose EfficientNet over standard ResNet50 due to compound scaling across depth, width, and resolution—achieving higher feature extraction fidelity on dermatological textures with significantly fewer parameters.',
      architectureSteps: [
        { step: '01', label: 'Raw Dermoscopic Input', detail: '224×224 RGB image ingestion & normalization' },
        { step: '02', label: 'OpenCV Artifact Filter', detail: 'Morphological Black-Hat + Telea Inpainting + CLAHE' },
        { step: '03', label: 'ROI Lesion Masking', detail: 'Otsu thresholding & contour bounding extraction' },
        { step: '04', label: 'EfficientNet Backbone', detail: 'MBConv blocks + Squeeze-and-Excitation attention' },
        { step: '05', label: 'Dual Output Heads', detail: 'Disease Class Probability + Severity Stage (I–III)' }
      ],
      githubUrl: 'https://github.com/S1h2i3v4a',
      liveUrl: null,
      interactiveType: 'cv-pipeline'
    },
    {
      id: 'expense-tracker',
      index: 'CASE // 02',
      title: 'Full-Stack Financial Expense & Budget Platform',
      subtitle: 'MERN Stack Telemetry & Cash-Flow Analytics',
      category: 'Full-Stack Web',
      featured: true,
      timeline: '2025',
      problem:
        'Students and independent professionals frequently lose track of recurring micro-expenses and category budget thresholds when relying on static spreadsheets or disconnected note apps.',
      solution:
        'Built an end-to-end MERN stack financial management platform featuring structured transaction logging, real-time category budget alerts, and MongoDB aggregation-powered visual analytics.',
      intendedUsers: 'Students, freelancers, and individuals managing monthly multi-category budgets.',
      keyFeatures: [
        'RESTful Express & Node.js API with modular controllers and schema validation.',
        'MongoDB aggregation pipelines calculating monthly burn rate, category splits, and net savings.',
        'Interactive React dashboard with dynamic date-range filtering and instant transaction mutations.',
        'Protected user sessions using JWT authentication and encrypted credential storage.',
        'Structured CSV export for external bookkeeping and audit trails.'
      ],
      techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'JWT', 'REST API'],
      technicalDecisions:
        'Offloaded monthly category grouping and sum calculations to MongoDB $group and $match aggregation stages rather than computing on the client thread, ensuring fast dashboard loads as transaction history grows.',
      architectureSteps: [
        { step: '01', label: 'React Client State', detail: 'Optimistic UI updates & filter query hooks' },
        { step: '02', label: 'JWT Auth Middleware', detail: 'Bearer token verification & user scoping' },
        { step: '03', label: 'Express Controllers', detail: 'CRUD validation & payload sanitization' },
        { step: '04', label: 'MongoDB Aggregations', detail: '$match → $group → $sort pipeline execution' }
      ],
      githubUrl: 'https://github.com/S1h2i3v4a',
      liveUrl: null,
      interactiveType: 'budget-sim'
    },
    {
      id: 'event-planner',
      index: 'CASE // 03',
      title: 'Celebration & Event Planner Web Application',
      subtitle: 'Collaborative Milestone, Vendor & Schedule Orchestrator',
      category: 'Full-Stack Web',
      featured: false,
      timeline: '2025',
      problem:
        'Coordinating event timelines, vendor checklists, guest allocations, and budget milestones across fragmented messaging threads leads to missed deadlines and scheduling conflicts.',
      solution:
        'Designed a centralized, mobile-responsive event planning web application that unifies milestone timelines, vendor task tracking, and budget allocation in an intuitive interface.',
      intendedUsers: 'Campus event organizers, celebration coordinators, and small operations teams.',
      keyFeatures: [
        'Interactive chronological event timeline with milestone status toggles.',
        'Category-based budget allocation vs. actual spend comparison cards.',
        'Responsive component system engineered for both desktop planning and on-site mobile usage.',
        'Modular data structures enabling rapid customization for academic fests or personal celebrations.'
      ],
      techStack: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Node.js', 'Express.js', 'REST APIs'],
      technicalDecisions:
        'Structured the UI around reusable state-driven checklist and timeline primitives so users can switch between high-level calendar overview and granular task execution without page reloads.',
      architectureSteps: [
        { step: '01', label: 'Event Blueprint Setup', detail: 'Date, venue, & milestone initialization' },
        { step: '02', label: 'Task & Vendor Matrix', detail: 'Priority tagging & status state machine' },
        { step: '03', label: 'Budget Reconciliation', detail: 'Real-time allocation vs. committed cost delta' }
      ],
      githubUrl: 'https://github.com/S1h2i3v4a',
      liveUrl: 'https://my-portfolio-od9l.onrender.com/',
      interactiveType: 'event-sim'
    },
    {
      id: 'mock-weather',
      index: 'CASE // 04',
      title: 'Dynamic Mock API Generator & Weather Telemetry Suite',
      subtitle: 'Developer Prototyping Utility & Live Meteorological Client',
      category: 'Developer Tools',
      featured: false,
      timeline: '2025 – 2026',
      problem:
        'Frontend engineers frequently block on incomplete backend endpoints during UI sprints, while API-driven applications require resilient error boundaries and debounced state management for live telemetry.',
      solution:
        'Developed a dual-purpose developer suite: a configurable Mock JSON API payload and status simulator for frontend prototyping, paired with a responsive Weather Telemetry Application consuming live meteorological endpoints.',
      intendedUsers: 'Frontend developers testing UI resilience and users querying real-time city weather conditions.',
      keyFeatures: [
        'Custom JSON schema builder capable of generating realistic mock REST responses on demand.',
        'Simulated HTTP latency (ms) and status code injection (200 OK, 429 Rate Limit, 500 Server Error) to test UI error boundaries.',
        'Live Weather Telemetry view with debounced city search, humidity/wind/pressure cards, and graceful fallback states.',
        'Clean keyboard-first interface with one-click cURL and Fetch snippet generation.'
      ],
      techStack: ['TypeScript', 'React.js', 'Next.js', 'Tailwind CSS', 'REST APIs', 'JSON Schema'],
      technicalDecisions:
        'Implemented request debouncing and AbortController cancellation in the telemetry client to prevent race conditions during rapid user typing.',
      architectureSteps: [
        { step: '01', label: 'Schema / Query Input', detail: 'JSON template definition or city telemetry lookup' },
        { step: '02', label: 'Latency & Status Layer', detail: 'Configurable delay & HTTP status simulation' },
        { step: '03', label: 'Telemetry Renderer', detail: 'Type-safe metric cards & copyable JSON output' }
      ],
      githubUrl: 'https://github.com/S1h2i3v4a',
      liveUrl: null,
      interactiveType: 'api-sim'
    }
  ] as Project[],

  journey: [
    {
      id: 'j1',
      period: '2026',
      tag: 'RESEARCH & PUBLICATIONS',
      title: 'Research Paper Co-Author — Skin Disease & Severity Classification',
      organization: 'SocProS Conference Submission Workflow',
      description:
        'Co-authored and prepared an academic research manuscript titled "Skin Disease Classification and Severity Stage Identification Using EfficientNet", detailing OpenCV preprocessing and deep transfer learning architectures.',
      highlights: ['EfficientNet Architecture', 'OpenCV Morphological Pipelines', 'Academic LaTeX & Peer Review Prep']
    },
    {
      id: 'j2',
      period: '2025 – 2026',
      tag: 'HACKATHONS & CASE STUDIES',
      title: 'Smart India Hackathon, Eurogrip Case Study & Skillinf 2026',
      organization: 'National & Collegiate Engineering Competitions',
      description:
        'Active builder across major technical hackathons: contributed full-stack MERN and AI modules for Smart India Hackathon problem statements, architected the "Saathi 360" ecosystem proposal for the Eurogrip × Unstop Case Study Hackathon, and engineered this bespoke portfolio for the Skillinf Portfolio Design Hackathon 2026.',
      highlights: ['Smart India Hackathon (MERN + AI)', 'Eurogrip Saathi 360 Strategy', 'Skillinf Portfolio Hackathon 2026']
    },
    {
      id: 'j3',
      period: '2024 – PRESENT',
      tag: 'ALGORITHMIC RIGOR',
      title: '300+ Data Structures & Algorithms Problems Solved in Java',
      organization: 'Striver’s A2Z DSA Sheet & System Design Practice',
      description:
        'Maintained consistent problem-solving discipline in Java covering recursion, binary trees, graph algorithms (Dijkstra, BFS/DFS, Topological Sort), dynamic programming, and foundational Low-Level / High-Level System Design.',
      highlights: ['Java Collections & Generics', 'Graph & DP Optimization', 'LLD / HLD Fundamentals']
    },
    {
      id: 'j4',
      period: '2023 – 2027',
      tag: 'EDUCATION',
      title: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
      organization: 'United Institute of Technology, Prayagraj',
      description:
        'Undergraduate coursework encompassing Data Structures, Operating Systems, Database Management Systems (DBMS), Computer Networks, Object-Oriented Programming, and Artificial Intelligence.',
      highlights: ['Core CS Fundamentals', 'Full-Stack Lab Projects', 'Class of 2027']
    }
  ] as JourneyMilestone[]
};
