const fs = require('fs');
const path = require('path');

function createPdf(outputPath) {
  const content = [];
  function addText(x, y, text, font = 'F1', size = 11) {
    const escaped = text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    content.push(`BT /${font} ${size} Tf ${x} ${y} Td (${escaped}) Tj ET`);
  }
  function addLine(x1, y1, x2, y2, width = 0.5) {
    content.push(`${width} w ${x1} ${y1} m ${x2} ${y2} l S`);
  }

  // Header
  addText(50, 740, 'SHIVAM KESHARI', 'F2', 20);
  addText(50, 722, 'Full-Stack Developer & Applied AI Systems Builder', 'F1', 11);
  addText(50, 706, 'Prayagraj, UP, India | shivamkeshari1510@gmail.com | github.com/S1h2i3v4a | linkedin.com/in/shivam15keshari', 'F1', 9);
  addLine(50, 696, 562, 696, 1);

  // Education
  addText(50, 680, 'EDUCATION', 'F2', 12);
  addLine(50, 674, 562, 674, 0.5);
  addText(50, 658, 'United Institute of Technology, Prayagraj', 'F2', 10);
  addText(430, 658, '2023 - 2027', 'F1', 10);
  addText(50, 644, 'Bachelor of Technology in Computer Science & Engineering (Final Year / Class of 2027)', 'F1', 9);

  // Technical Skills
  addText(50, 622, 'TECHNICAL SKILLS', 'F2', 12);
  addLine(50, 616, 562, 616, 0.5);
  addText(50, 600, 'Languages: Java (300+ Solved DSA Problems, OOP), Python, JavaScript (ES6+), TypeScript, SQL', 'F1', 9.5);
  addText(50, 586, 'Web & Backend: Next.js (App Router), React.js, Node.js, Express.js, MongoDB (Aggregations), REST APIs', 'F1', 9.5);
  addText(50, 572, 'AI & Computer Vision: OpenCV (Morphological Filters, CLAHE, Otsu), EfficientNet-B0, CNNs, Scikit-Learn', 'F1', 9.5);
  addText(50, 558, 'Developer Tools: Git, GitHub, Tailwind CSS v4, Three.js WebGL, Vercel, Render', 'F1', 9.5);

  // Research & Academic Publications
  addText(50, 536, 'RESEARCH & PUBLICATIONS', 'F2', 12);
  addLine(50, 530, 562, 530, 0.5);
  addText(50, 514, 'Skin Disease Classification and Severity Stage Identification', 'F2', 10);
  addText(420, 514, 'SocProS 2026 Submission', 'F1', 9);
  addText(50, 500, '- Engineered an OpenCV preprocessing pipeline applying morphological black-hat filtering and CLAHE.', 'F1', 9);
  addText(50, 488, '- Segmented dermatological lesions via adaptive Otsu ROI masking for noise-resistant feature extraction.', 'F1', 9);
  addText(50, 476, '- Evaluated transfer learning on EfficientNet-B0 with multi-class diagnostic staging on benchmark PH2 dataset.', 'F1', 9);
  addText(50, 464, '- Achieved 94.2% test-split classification accuracy and 96.15% precision on PH2 benchmark dataset.', 'F1', 9);

  // Projects
  addText(50, 442, 'ENGINEERING PROJECTS', 'F2', 12);
  addLine(50, 436, 562, 436, 0.5);
  
  addText(50, 420, 'Full-Stack Financial Expense Platform (MERN)', 'F2', 10);
  addText(460, 420, '2025', 'F1', 9);
  addText(50, 406, '- Architected REST API backend with Express.js and MongoDB aggregation pipelines ($match, $group).', 'F1', 9);
  addText(50, 394, '- Designed responsive React dashboard with monthly burn-rate calculations and category budget delta alerts.', 'F1', 9);
  addText(50, 382, '- Implemented JWT bearer authentication and role-based data isolation.', 'F1', 9);

  addText(50, 360, 'Celebration & Event Planner Web Application', 'F2', 10);
  addText(460, 360, '2025', 'F1', 9);
  addText(50, 346, '- Built a centralized event coordination interface with interactive milestone status timelines in React.', 'F1', 9);
  addText(50, 334, '- Engineered vendor allocation matrix and real-time budget reconciliation ledger.', 'F1', 9);

  addText(50, 312, 'Dynamic Mock API Generator & Weather Telemetry Client', 'F2', 10);
  addText(440, 312, '2025 - 2026', 'F1', 9);
  addText(50, 298, '- Developed configurable JSON schema generator and live HTTP error boundary simulator (200, 429, 500).', 'F1', 9);
  addText(50, 286, '- Created responsive telemetry client fetching meteorological observations across multiple stations.', 'F1', 9);

  // Achievements & Hackathons
  addText(50, 264, 'ACHIEVEMENTS & HACKATHONS', 'F2', 12);
  addLine(50, 258, 562, 258, 0.5);
  addText(50, 242, '- Solved 300+ DSA problems in Java following Striver A2Z sheet across LeetCode and GeeksforGeeks.', 'F1', 9.5);
  addText(50, 228, '- Smart India Hackathon (SIH Internal): Developed automated administrative and tracking workflows.', 'F1', 9.5);
  addText(50, 214, '- Eurogrip Hackathon: Built data analytics prototypes under timed competitive constraints.', 'F1', 9.5);
  addText(50, 200, '- Portfolio Design Hackathon 2026 (Skillinf): Built award-winning cinematic 3D Next.js engineering portfolio.', 'F1', 9.5);

  const stream = content.join('\n');
  const streamLength = Buffer.byteLength(stream, 'utf8');

  let pdf = '%PDF-1.4\n';
  const offsets = [];

  function addObj(str) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += str + '\n';
  }

  addObj('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  addObj('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');
  addObj(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj`);
  addObj(`4 0 obj\n<< /Length ${streamLength} >>\nstream\n${stream}\nendstream\nendobj`);
  addObj('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj');
  addObj('6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj');

  const startxref = Buffer.byteLength(pdf, 'utf8');
  pdf += 'xref\n0 7\n0000000000 65535 f \n';
  for (const offset of offsets) {
    pdf += String(offset).padStart(10, '0') + ' 00000 n \n';
  }
  pdf += `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF`;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, pdf);
  console.log('Successfully generated resume PDF at:', outputPath, 'Bytes:', fs.statSync(outputPath).size);
}

createPdf(path.join(__dirname, '../public/resume.pdf'));
