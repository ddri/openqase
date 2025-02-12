// src/components/PixelGradient.tsx
export default function PixelGradient() {
    // Generate a grid of dots that gets denser towards the bottom
    const rows = 50
    const dotsPerRow = 100
    const dots = []
  
    for (let y = 0; y < rows; y++) {
      const opacity = y / rows // Increases opacity as we go down
      const threshold = Math.max(0.1, opacity) // Probability of showing a dot
      
      for (let x = 0; x < dotsPerRow; x++) {
        if (Math.random() < threshold) {
          dots.push(
            <rect
              key={`${x}-${y}`}
              x={x * 20}
              y={y * 20}
              width="4"
              height="4"
              fill="white"
              opacity={opacity}
            />
          )
        }
      }
    }
  
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 2000 1000" 
          preserveAspectRatio="xMidYMid slice"
          className="opacity-20"
        >
          {dots}
        </svg>
      </div>
    )
  }