import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import cursorImg from "../assets/logo_Black.png";

const CustomCursor = () => {
  const mainCursor = useRef(null);
  const secondaryCursor = useRef(null);

  useEffect(() => {
    gsap.set([mainCursor.current, secondaryCursor.current], { 
      xPercent: -50, 
      yPercent: -50 
    });

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      gsap.to(mainCursor.current, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "none",
      });

      gsap.to(secondaryCursor.current, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseDown = () => {
      gsap.to(secondaryCursor.current, { scale: 0.8, duration: 0.2 });
      gsap.to(mainCursor.current, { scale: 0.8, duration: 0.2 });
    };

    const handleMouseUp = () => {
      gsap.to(secondaryCursor.current, { scale: 1, duration: 0.2 });
      gsap.to(mainCursor.current, { scale: 1, duration: 0.2 });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest("button, a, .ticker")) {
        gsap.to(secondaryCursor.current, { 
          scale: 1.8, 
          backgroundColor: "rgba(255, 255, 255, 0.1)", 
          duration: 0.3 
        });
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest("button, a, .ticker")) {
        gsap.to(secondaryCursor.current, { 
          scale: 1, 
          backgroundColor: "transparent",
          duration: 0.3 
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={secondaryCursor}
        className="cursor-ring"
        style={{
          position: "fixed",
          width: "40px",
          height: "40px",
          border: "1.5px solid white", 
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 1000001, // Updated zIndex
          mixBlendMode: "difference", 
        }}
      />
      
      {/* Main Image Cursor */}
      <div
        ref={mainCursor}
        className="universal-cursor"
        style={{
          position: "fixed",
          width: "20px",
          height: "20px",
          pointerEvents: "none",
          zIndex: 1000001, // Updated zIndex
          mixBlendMode: "difference", 
        }}
      >
        <img
          src={cursorImg}
          alt="cursor"
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "contain",
            filter: "invert(1)" 
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;