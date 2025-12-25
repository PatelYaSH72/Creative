import React, { useEffect, useRef } from 'react';
import "../styles/Home.css"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Aurora from '../components/Aurora.light';
// import LogoLoop from '../components/LogoLoop';
import LogLoop from '../components/Logloop';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'lucide-react';
import TeamMember from '../components/TeamMember';
import Testimonials from '../components/Testimonials/Testimonials';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {

  const navigate = useNavigate()
  const auroraRef = useRef(null);
  const heroTextRef = useRef(null);
  const marqueeRef = useRef(null);
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);

  const marqueeTweenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      if (!marqueeRef.current) return;

      const marqueeWidth = marqueeRef.current.offsetWidth;

      gsap.to(".aurora-layer", {
  x: () => gsap.utils.random(-120, 120),
  y: () => gsap.utils.random(-60, 40),
  scale: () => gsap.utils.random(1, 1.2),
  duration: 4, // fast speed
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  stagger: { each: 2, from: "random" },
});

      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".hero-title", { y: 100, opacity: 0, duration: 1.5, delay: 0.5 })
        .from(".hero-subtitle", { y: 30, opacity: 0, duration: 1.2 }, "-=1")
        .from(".hero-cta", { scale: 0.8, opacity: 0, duration: 1 }, "-=0.8");

      marqueeTweenRef.current = gsap.to(".marquee-content", {
        x: `-${marqueeWidth / 2}px`,
        duration: 20,
        ease: "none",
        repeat: -1
      });

      gsap.from(".reveal-box", {
        scrollTrigger: { trigger: ".reveal-box", start: "top 80%" },
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      });

    });

    return () => ctx.revert();
  }, []);

  const handleBtnHover = (e, enter) => {
    gsap.to(e.target, {
      scale: enter ? 1.05 : 1,
      boxShadow: enter
        ? "0px 0px 20px rgba(126, 243, 255, 0.6)"
        : "0px 0px 0px rgba(0,0,0,0)",
      duration: 0.4,
      ease: "power2.out"
    });
  };

 

  

  

  return (
    <div className="home-container">
  <section className="hero-section">
    <Aurora colorStops={['#4fd0ff', '#ffffffff',  '#961919']}
      amplitude={0.8} blend={0.2} speed={2} brightness={0.8} />
    
    <h1 className="hero-title">
      DESIGN THE <br /> FUTURE.
    </h1>

    <button
      className="hero-cta"
      onMouseEnter={(e) => handleBtnHover(e, true)}
      onMouseLeave={(e) => handleBtnHover(e, false)}
      onClick={() => navigate('/about')}
    >
      Start a Project
    </button>
  </section>

  <LogLoop />
  <Testimonials/>
  <TeamMember/>
</div>

  );
};

export default Home;
