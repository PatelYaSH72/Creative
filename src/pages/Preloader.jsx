import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/Preloader.css";
import TextShuffle from "../components/TextShuffle";

const Preloader = ({ onFinish }) => {
  const loaderRef = useRef(null);
  const pathRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    // 1. Create a GSAP Context for React cleanup
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onFinish) onFinish();
        },
      });

      // Initial State: Path is flat at the bottom
      // M0 1000 Q720 1000 1440 1000 L1440 0 L0 0 Z

      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", delay: 0.5 }
      )

        .to(pathRef.current, {
          duration: 0.5,
          // delay: 0.9,
          attr: { d: "M0 600 Q720 1000 1440 600 L1440 0 L0 0 Z" },
          ease: "power3.inOut",
        })

        .to(pathRef.current, {
          duration: 1.4,
          delay: 0.1,
          attr: { d: "M0 0 Q720 0 1440 0 L1440 0 L0 0 Z" },
          ease: "power4.out",
        })

        .to(
          loaderRef.current,
          {
            yPercent: -100,
            duration: 1,  
            ease: "power4.inOut",
          },
          "-=1"
        );
    });

    return () => ctx.revert(); // 2. Clean up context on unmount
  }, [onFinish]);

  return (
    <div className="loader-wrapper" ref={loaderRef}>
      <div className="loader-text">
        <TextShuffle
          texts={[
            "रचनात्मक उपवाक्य",
            "क्रिएटिव्ह कलम",
            "સર્જનાત્મક કલમ",
            "ஆக்கப்பூர்வமான விதி",
            "সৃষ্টিশীল দফা",
            "Cre8ive Clause",
          ]}
        />
      </div>

      <svg
        className="svg-container"
        viewBox="0 0 1440 1000"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          fill="black" /* Ensure fill color matches your design */
          d="M0 0 Q720 1000 1440 0 L1440 0 L0 0 Z"
        />
      </svg>
    </div>
  );
};

export default Preloader;
