import { useEffect, useState } from 'react';



export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = () => {
      setIsHovering(true);
    };

    const onMouseOut = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      <div 
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div 
          className={`
            relative flex items-center justify-center
            transition-all duration-200 ease-out neon-cursor
            ${isHovering ? 'scale-100' : 'scale-100'}
          `}
        >
          {/* Inner glowing dot */}
          <div className="absolute bg-[#a4cddb] rounded-full w-8 h-8 shadow-lg animate-pulse" />
          {/* Outer glowing ring */}
          <div 
            className={`
              absolute  rounded-full
              transition-all duration-500 ease-out
              ${isHovering ? 'w-20 h-20 opacity-60' : 'w-5 h-5 opacity-40'}
            `}
          />
        </div>
      </div>
    </>
  );
}
