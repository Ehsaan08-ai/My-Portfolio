import { useEffect, useRef } from 'react';

interface SpotlightProps {
  className?: string;
  fill?: string;
  size?: number;
}

/**
 * Spotlight Component
 * Creates a cinematic golden glow effect behind the 3D robot.
 * Uses SVG radial gradient for a metallic, luxury appearance.
 */
export function Spotlight({ className = '', fill = '#D4AF37', size = 400 }: SpotlightProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update spotlight position to follow cursor
      const circle = svgRef.current.querySelector('circle');
      if (circle) {
        circle.setAttribute('cx', String(x));
        circle.setAttribute('cy', String(y));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox={`0 0 ${size} ${size}`}
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id="spotlight-gradient" r="40%">
          <stop offset="0%" stopColor={fill} stopOpacity="0.8" />
          <stop offset="50%" stopColor={fill} stopOpacity="0.3" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 3}
        fill="url(#spotlight-gradient)"
      />
    </svg>
  );
}
