import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // ScrollTrigger use karenge better results ke liye
import "../styles/InfiniteMarquee.css";
import doollogo from "../assets/logo_Black.png";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const InfiniteMarquee = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tickers = containerRef.current.querySelectorAll(".ticker");

      // 1. Marquee Animation (Horizontal Loop)
      tickers.forEach((ticker) => {
        const inner = ticker.querySelector(".ticker-wrap");
        const content = inner.querySelector(".ticker-text");
        const duration = ticker.getAttribute("data-duration") || 25;

        if (inner.children.length < 2) {
          inner.append(content.cloneNode(true));
        }

        gsap.to(inner, {
          xPercent: -50,
          repeat: -1,
          duration: parseFloat(duration),
          ease: "none",
        });
      });

      // 2. Scroll-Based Rotation Logic
      // Initial state set kar dete hain
      gsap.set(tickers, { rotateZ: -1.5, scale: 1.1 });

      ScrollTrigger.create({
        onUpdate: (self) => {
          // velocity positive matlab down, negative matlab up
          let velocity = self.getVelocity();
          let rotationAmount = velocity > 0 ? -5 : 5;

          gsap.to(tickers, {
            rotateZ: rotationAmount,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Link to={'/contact/contact-form'} className="marquee-section" ref={containerRef} >
      <div className="ticker" data-duration="25">
        <div className="ticker-wrap">
          <div className="ticker-text">
            <span>GET YOUR CREATIVE CLAUSE</span>
            <img src={doollogo} alt="logo" className="ticker-icon" />
            <span>GET YOUR CREATIVE CLAUSE</span>
            <img src={doollogo} alt="logo" className="ticker-icon" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InfiniteMarquee;