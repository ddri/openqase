// src/components/CardPixelPattern.tsx
export default function CardPixelPattern() {
    return (
      <div className="absolute inset-0 w-full h-full opacity-[9.95] group-hover:opacity-[0.3] transition-opacity duration-500">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <defs>
            <pattern 
              id="pixel-grid" 
              width="2" 
              height="2" 
              patternUnits="userSpaceOnUse"
            >
              <rect 
                width="1" 
                height="1" 
                fill="currentColor" 
              />
            </pattern>
            <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B87E6C" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#B87E6C" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#B87E6C" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#B87E6C" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <rect 
            width="100%" 
            height="100%" 
            fill="url(#pixel-grid)"
            mask="url(#fade-mask)"
          />
          <mask id="fade-mask">
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </svg>
      </div>
    )
  }