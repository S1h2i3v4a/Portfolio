import React from 'react';

export function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function PlayIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

export function ReactIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" stroke="currentColor">
      <circle cx="0" cy="0" r="2.05" fill="currentColor" stroke="none" />
      <g strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className} fill="currentColor">
      <mask height="180" id="next-mask" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
        <circle cx="90" cy="90" fill="black" r="90" />
      </mask>
      <g mask="url(#next-mask)">
        <circle cx="90" cy="90" data-theme="dark" fill="none" r="88" stroke="currentColor" strokeWidth="4" />
        <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.136 149.508 157.438Z" fill="currentColor" />
        <rect fill="currentColor" height="72" width="12" x="115" y="54" />
      </g>
    </svg>
  );
}

export function TypeScriptIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.237 13.914h-2.146V20H7.31v-6.086H5.164v-1.787h6.573v1.787zm4.27 3.518c.62.33 1.343.535 2.052.535.918 0 1.488-.396 1.488-1.025 0-.61-.393-.934-1.424-1.397-1.48-.62-2.34-1.385-2.34-2.673 0-1.636 1.353-2.872 3.42-2.872.932 0 1.777.228 2.378.563l-.62 1.696c-.476-.27-1.127-.447-1.802-.447-.96 0-1.374.457-1.374.92 0 .584.445.89 1.517 1.385 1.543.684 2.257 1.46 2.257 2.723 0 1.75-1.353 2.91-3.626 2.91-1.077 0-2.1-.284-2.784-.69l.663-1.628z" />
    </svg>
  );
}

export function TailwindIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  );
}

export function PythonIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11.914 0C5.825 0 6.2 2.656 6.2 2.656l.006 2.75h5.813v.825H3.882S0 5.794 0 11.913c0 6.12 3.394 5.918 3.394 5.918h2.025v-2.85s-.11-3.394 3.337-3.394h5.756v-.844h.025V5.512s.475-5.512-5.625-5.512zm-3.14 1.744a1.012 1.012 0 1 1 0 2.025 1.012 1.012 0 0 1 0-2.025zM12.086 24c6.089 0 5.713-2.656 5.713-2.656l-.006-2.75h-5.813v-.825h8.138s3.881.437 3.881-5.682c0-6.119-3.394-5.918-3.394-5.918h-2.025v2.85s.11 3.394-3.337 3.394H9.488v.844h-.025v5.231s-.475 5.513 5.625 5.513zm3.14-1.744a1.012 1.012 0 1 1 0-2.025 1.012 1.012 0 0 1 0 2.025z" />
    </svg>
  );
}

export function ThreejsIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 1.5L2.5 6.75v10.5L12 22.5l9.5-5.25V6.75L12 1.5zm0 2.3l6.98 3.86L12 11.53 5.02 7.66 12 3.8zm-8 4.75l7 3.88v7.71l-7-3.87V8.55zm16 0v7.72l-7 3.87v-7.71l7-3.88z" />
    </svg>
  );
}

export function NodejsIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm0 2.3l8.5 4.9v9.6L12 21.7 3.5 16.8V7.2L12 2.3z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function MongodbIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0C11.5 1 8 6 8 12c0 5 3.5 10 3.7 11.8.1.5.4.2.4.2s.3.3.4-.2C12.7 22 16 17 16 12c0-6-3.5-11-4-12zm-.2 22.6c-.3-2.5-2.8-6.9-2.8-10.6 0-4.1 2.2-8.3 3-9.8.8 1.5 3 5.7 3 9.8 0 3.7-2.5 8.1-2.8 10.6-.2-.5-.3-.7-.4-.7s-.2.2-.4.7z" />
    </svg>
  );
}

export function JavaIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 19c4 2 12 2 16 0M2 15c6 3 14 3 20 0M6 11c3 1.5 9 1.5 12 0" />
      <path d="M12 2c-2 2-3 4-1 6 3 3 1 5-1 7" strokeDasharray="1 1" />
    </svg>
  );
}
