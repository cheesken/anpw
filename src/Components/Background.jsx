import React, { useEffect } from 'react';
import useFluidCursor from '../hooks/useFluidCursor';

const Background = ({ children }) => {
  useEffect(() => {
    console.log('Background mounted, initializing fluid...');

    const initFluid = () => {
      const canvas = document.getElementById('fluid');
      if (canvas) {
        console.log('Canvas found, starting fluid simulation');

        const cleanup = useFluidCursor();

        const handleTouchStart = (e) => {
          e.preventDefault();
          Array.from(e.touches).forEach((touch) => {
            const event = new MouseEvent('mousedown', {
              clientX: touch.clientX,
              clientY: touch.clientY,
              bubbles: true,
            });
            canvas.dispatchEvent(event);
          });
        };

        const handleTouchMove = (e) => {
          e.preventDefault();
          Array.from(e.touches).forEach((touch) => {
            const event = new MouseEvent('mousemove', {
              clientX: touch.clientX,
              clientY: touch.clientY,
              bubbles: true,
            });
            canvas.dispatchEvent(event);
          });
        };

        const handleTouchEnd = (e) => {
          e.preventDefault();
          const event = new MouseEvent('mouseup', {
            bubbles: true,
          });
          canvas.dispatchEvent(event);
        };

        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
        canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });

        return () => {
          canvas.removeEventListener('touchstart', handleTouchStart);
          canvas.removeEventListener('touchmove', handleTouchMove);
          canvas.removeEventListener('touchend', handleTouchEnd);
          canvas.removeEventListener('touchcancel', handleTouchEnd);
          if (cleanup) cleanup();
        };
      } else {
        console.error('Canvas not found!');
      }
    };

    const timer = setTimeout(() => {
      const cleanupFluid = initFluid();

      return () => {
        console.log('Background unmounting');
        if (cleanupFluid) cleanupFluid();
      };
    }, 100);

    return () => {
      console.log('Background unmounting');
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh', // ✅ Changed from height to minHeight
        // overflow: 'hidden',    // ✅ REMOVED - this was blocking scroll
        backgroundColor: 'white',
      }}
    >
      <canvas
        id="fluid"
        style={{
          position: 'fixed', // ✅ Changed from absolute to fixed
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh', // Keep canvas covering viewport
          touchAction: 'none',
          pointerEvents: 'none', // ✅ Added - canvas doesn't block clicks
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          pointerEvents: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Background;
