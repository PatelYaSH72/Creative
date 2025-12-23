import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import doollogo from "../assets/logo_Black.png";

const InfiniteMarquee = () => {
  const tickerRefs = useRef([]);
  const lastDirection = useRef("down");

  const tickerImgStyle = () => ({
    width: "0.76em",
    height: "0.76em",
    objectFit: "contain",
    display: "inline-block",
    verticalAlign: "middle",
    margin: "0 0.4em",
    marginLeft: "0.5em",
  });

  useEffect(() => {
    tickerRefs.current.forEach((ticker) => {
      const inner = ticker.querySelector(".ticker-wrap");
      const content = inner.querySelector(".ticker-text");
      const duration = ticker.getAttribute("data-duration");

      // Loop fix: Ek baar content clone karke append karein
      if (inner.children.length < 2) {
        inner.appendChild(content.cloneNode(true));
      }

      // Overlap fix: Pure 'inner' container ko -50% move karein
      // Kyunki content double ho chuka hai, 50% shift perfect seamless loop banayega
      gsap.to(inner, {
        xPercent: -50,
        repeat: -1,
        duration: parseFloat(duration),
        ease: "none", // Infinite loop ke liye 'none' linear se better hai
      });
    });

    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";

      if (direction !== lastDirection.current) {
        gsap.to(tickerRefs.current, {
          rotateZ: direction === "down" ? -5 : 5,
          duration: 1,
          ease: "power4.out",
        });
        lastDirection.current = direction;
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.killTweensOf(".ticker-wrap"); // Cleanup
    };
  }, []);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "50vh",
        overflow: "hidden",
        fontFamily: "Lausanne, sans-serif",
      }}
    >
      <a
        ref={(el) => (tickerRefs.current[0] = el)}
        data-duration="30"
        style={{
          whiteSpace: "nowrap",
          backgroundColor: "var(--accent, #f0f0f0)", // Fallback color add kiya
          width: "100%",
          display: "block",
          textDecoration: "none"
        }}
      >
        <div
          className="ticker-wrap"
          style={{
            display: "flex",
            width: "max-content",
            paddingTop: "6px",
          }}
        >
          {/* Main Content Block */}
          <div
            className="ticker-text"
            style={{
              display: "flex",
              alignItems: "center",
              color: "#000",
              fontSize: "clamp(85px, 12vw, 170px)",
              fontWeight: 600,
              lineHeight: "1.1",
              letterSpacing: "-0.015em",
              paddingRight: "40px" // Dono sets ke beech ka gap
            }}
          >
            GET YOUR CREATIVE CLAUSE
            <img src={doollogo} alt="" style={tickerImgStyle()} />
            GET YOUR CREATIVE CLAUSE
            <img src={doollogo} alt="" style={tickerImgStyle()} />
          </div>
        </div>
      </a>
    </section>
  );
};

export default InfiniteMarquee;