import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/About.css";
import ScrollReveal from "../components/ScrollRevel";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. ABOUT Title Animation: Scale 1.5 aur Opacity 0
      gsap.to(titleRef.current, {
        scale: 1.5,
        opacity: 0,
        filter: "blur(15px)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",      // Jab section top pe aaye
          end: "bottom 40%",     // Animation beech mein hi khatam ho jaye
          scrub: 1,               
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page-wrapper">
      {/* Animation Section */}
      <section ref={sectionRef} className="about-sticky-container">
        <div className="title-wrapper">
          <h1 ref={titleRef} className="about-title">ABOUT</h1>
        </div>

        <div className="para-wrapper">
          <ScrollReveal 
            baseRotation={5} 
            blurStrength={8} 
            baseOpacity={0}
            containerClassName="reveal-container"
          >
            We are a creative collective of designers and developers 
            passionate about building high-end digital experiences 
            that leave a lasting impression.
          </ScrollReveal>
        </div>
        <section className="about-values">
        <div className="values-container">
          <h2 className="values-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Innovation</h3>
              <p>Pushing boundaries and exploring new creative territories.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Excellence</h3>
              <p>Delivering exceptional quality in everything we do.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Collaboration</h3>
              <p>Working together to achieve extraordinary results.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Creativity</h3>
              <p>Bringing fresh perspectives to every project.</p>
            </div>
          </div>
        </div>
      </section>
      </section>

      {/* Values Section - Now perfectly visible */}
      
    </div>
  );
}