import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Aurora from '../components/Aurora.light';
// import LogoLoop from '../components/LogoLoop';
import LogLoop from '../components/Logloop';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
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

 

  const styles = {
    container: {
      fontFamily: '"Inter", -apple-system, sans-serif',
      overflowX: 'hidden',
      backgroundColor: 'var(--background)',
      color: 'var(--text-dark)',
      // CSS variables
      '--primary': '#961919',
      '--background': '#ffffff',
      '--text-dark': '#222222',
      '--pure-black': '#000000',
      '--accent': '#7EF3FF',
    },
    hero: {
      height: '100vh',
      width: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      // padding: '0 20px',
      overflow: 'hidden',
    },
    
    title: {
      paddingTop:"80px",
      fontSize: 'clamp(4.5rem, 12vw, 10rem)',
      fontWeight: 900,
      color: 'var(--pure-black)',
      lineHeight: 1.1,
      marginBottom: '20px',
      position: 'relative',
      zIndex: 111,
    },
    subtitle: {
      fontSize: '1.2rem',
      maxWidth: '600px',
      marginBottom: '40px',
      color: 'var(--text-dark)',
      position: 'relative',
      zIndex: 1,
    },
    cta: {
      backgroundColor: 'var(--primary)',
      color: 'var(--background)',
      padding: '18px 40px',
      
      borderRadius: '50px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      position: 'relative',
      zIndex: 1,
      marginTop:"80px",
      letterSpacing: '1px',
    },
    marqueeWrapper: {
      width: '100%',
      padding: '80px 0',
      backgroundColor: 'var(--background)',
      borderTop: '1px solid #f0f0f0',
      overflow: 'hidden',
    },
    marqueeContent: {
      display: 'flex',
      width: 'max-content',
    },
    logoItem: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'var(--text-dark)',
      margin: '0 60px',
      opacity: 0.4,
      textTransform: 'uppercase',
      letterSpacing: '2px',
    },
    section: {
      height: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 5%',
    }
  };

  

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        
        <Aurora colorStops={['#4fd0ffc4', '#7b7e7eb3', '#96191984']}
  amplitude={0.6}
  blend={0.2}
  speed={2}
  brightness={0.8}/>
<h1 className="hero-title" style={styles.title}>
          DESIGN THE <br /> FUTURE.
        </h1>
        
        <button
          className="hero-cta"
          style={styles.cta}
          onMouseEnter={(e) => handleBtnHover(e, true)}
          onMouseLeave={(e) => handleBtnHover(e, false)}
        >
          Start a Project
        </button>
        
      </section>

      <LogLoop/>
    </div>
  );
};

export default Home;
