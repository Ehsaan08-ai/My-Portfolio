import Spline from '@splinetool/react-spline';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplineSceneProps {
  url: string;
  className?: string;
  onLoad?: (app: any) => void;
}

/**
 * SplineScene Component
 * Renders a 3D Spline scene with interactive features:
 * - Cursor tracking for robot "look at" effect
 * - Scroll-triggered floating animation
 * - Smooth transitions and cinematic effects
 */
export function SplineScene({ url, className = '', onLoad }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    const handleSplineLoad = (splineApp: any) => {
      appRef.current = splineApp;
      if (onLoad) onLoad(splineApp);

      // Add cursor tracking for "look at" effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Normalize coordinates to -1 to 1 range
        const normalizedX = (x - 0.5) * 2;
        const normalizedY = (y - 0.5) * 2;

        // Update Spline object rotation based on cursor position
        try {
          const robot = splineApp.getObjectByName('Robot');
          if (robot) {
            // Subtle rotation based on cursor position
            gsap.to(robot.rotation, {
              x: normalizedY * 0.3,
              y: normalizedX * 0.3,
              duration: 0.5,
              overwrite: 'auto',
            });
          }
        } catch (e) {
          // Silently handle if object doesn't exist
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Add scroll-triggered floating animation
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        trigger: containerRef.current,
        onUpdate: (self) => {
          try {
            const robot = splineApp.getObjectByName('Robot');
            if (robot) {
              const floatAmount = Math.sin(self.getVelocity() * 0.01) * 0.5;
              gsap.to(robot.position, {
                y: floatAmount,
                duration: 0.3,
                overwrite: 'auto',
              });
            }
          } catch (e) {
            // Silently handle if object doesn't exist
          }
        },
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    };

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [onLoad]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
    >
      <Spline
        scene={url}
        onLoad={handleSplineLoad}
      />
    </div>
  );

  function handleSplineLoad(splineApp: any) {
    appRef.current = splineApp;
    if (onLoad) onLoad(splineApp);

    // Add cursor tracking for "look at" effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Normalize coordinates to -1 to 1 range
      const normalizedX = (x - 0.5) * 2;
      const normalizedY = (y - 0.5) * 2;

      // Update Spline object rotation based on cursor position
      try {
        const robot = splineApp.getObjectByName('Robot');
        if (robot) {
          // Subtle rotation based on cursor position
          gsap.to(robot.rotation, {
            x: normalizedY * 0.3,
            y: normalizedX * 0.3,
            duration: 0.5,
            overwrite: 'auto',
          });
        }
      } catch (e) {
        // Silently handle if object doesn't exist
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Add scroll-triggered floating animation
    ScrollTrigger.create({
      trigger: containerRef.current,
      onUpdate: (self) => {
        try {
          const robot = splineApp.getObjectByName('Robot');
          if (robot) {
            const floatAmount = Math.sin(self.getVelocity() * 0.01) * 0.5;
            gsap.to(robot.position, {
              y: floatAmount,
              duration: 0.3,
              overwrite: 'auto',
            });
          }
        } catch (e) {
          // Silently handle if object doesn't exist
        }
      },
    });
  }
}
