// src/types/lucide-react.d.ts
// Type definitions for Lucide React icons in TypeScript

declare module 'lucide-react' {
  import * as React from 'react';

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }

  export type LucideIcon = React.FC<LucideProps>;

  export const Terminal: LucideIcon;
  export const Code2: LucideIcon;
  export const Cpu: LucideIcon;
  export const Layers: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const ArrowUp: LucideIcon;
  export const ArrowDown: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const Globe: LucideIcon;
  export const FileText: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Check: LucideIcon;
  export const Copy: LucideIcon;
  export const Sliders: LucideIcon;
  export const Eye: LucideIcon;
  export const EyeOff: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const FolderGit2: LucideIcon;
  export const BookOpen: LucideIcon;
  export const Award: LucideIcon;
  export const Send: LucideIcon;
  export const Mail: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const Activity: LucideIcon;
  export const Database: LucideIcon;
  export const Server: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Braces: LucideIcon;
  export const Workflow: LucideIcon;
  export const Play: LucideIcon;
  export const Pause: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Download: LucideIcon;
  export const Printer: LucideIcon;
  export const Filter: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const Compass: LucideIcon;
  export const Box: LucideIcon;
  export const GraduationCap: LucideIcon;
  export const Calendar: LucideIcon;
  export const CloudSun: LucideIcon;

  // Fallback for any other lucide icon
  const icon: LucideIcon;
  export default icon;
}
