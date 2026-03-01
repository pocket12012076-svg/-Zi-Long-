import { motion } from "motion/react";

export const CatIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 5c.67 0 1.33.12 1.94.34.42.15.82.38 1.18.67.36.29.67.64.91 1.04.24.4.4.84.47 1.3.07.46.07.93 0 1.39-.07.46-.23.9-.47 1.3-.24.4-.55.75-.91 1.04-.36.29-.76.52-1.18.67-.61.22-1.27.34-1.94.34s-1.33-.12-1.94-.34c-.42-.15-.82-.38-1.18-.67-.36-.29-.67-.64-.91-1.04-.24-.4-.4-.84-.47-1.3-.07-.46-.07-.93 0-1.39.07-.46.23-.9.47-1.3.24-.4.55-.75.91-1.04.36-.29.76-.52 1.18-.67.61-.22 1.27-.34 1.94-.34z" />
    <path d="M15 5l1-2" />
    <path d="M9 5L8 3" />
    <path d="M12 14v5" />
    <path d="M9 21h6" />
    <path d="M17 11h2" />
    <path d="M5 11h2" />
  </svg>
);

export const MinimalCat = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.2" 
    className={className}
  >
    <path d="M12 18c-4 0-5-2-5-6s1-8 5-8 5 4 5 8-1 6-5 6z" />
    <path d="M8 6L7 4M16 6l1-2" />
    <circle cx="10" cy="11" r="0.5" fill="currentColor" />
    <circle cx="14" cy="11" r="0.5" fill="currentColor" />
    <path d="M12 13v1" />
  </svg>
);
