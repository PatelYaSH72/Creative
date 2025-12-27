import React, { useEffect, useRef } from 'react';
import '../styles/Contact.css';
import { FaInstagram, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import InfiniteMarquee1 from '../components/1InfiniteMarquee.jsx';
import { Link } from 'react-router-dom';

gsap.registerPlugin(Observer);

export default function Contact() {
  const trackRef = useRef(null);

 useEffect(() => {
    const items = gsap.utils.toArray(".scroll-content-block");
    const isMobile = window.innerWidth < 768;
    const gap = isMobile ? 120 : 300;
    const itemHeight = window.innerHeight + gap;

    let yTrack = 0;
    let targetY = 0;

    const totalHeight = itemHeight * items.length;
    const wrap = gsap.utils.wrap(-itemHeight, totalHeight - itemHeight);

    const render = () => {
      // Mobile ke liye lerp factor ko aur slow kiya hai (0.05) taaki ekdum se jhatka na lage
      const lerpFactor = isMobile ? 0.05 : 0.1; 
      yTrack += (targetY - yTrack) * lerpFactor;

      items.forEach((item, i) => {
        const rawY = yTrack + i * itemHeight;
        const cycledY = wrap(rawY);
        gsap.set(item, { y: cycledY });
      });
    };

    gsap.ticker.add(render);

    const obs = Observer.create({
      target: window,
      type: "wheel,touch,pointer",onUp: () => {
    // Jab user upar scroll kare (content niche jaye)
    gsap.to(".ticker", { rotateZ: 5, duration: 0.8, ease: "power2.out", overwrite: true });
  },
  onDown: () => {
    // Jab user niche scroll kare (content upar jaye)
    gsap.to(".ticker", { rotateZ: -5, duration: 0.8, ease: "power2.out", overwrite: true });
  },
      onChange: (self) => {
        if (self.event.type === "wheel") {
          targetY -= self.deltaY * 0.8;
        } else {
          // 1. Velocity ko 0.03 se multiply kiya taaki speed kam ho jaye
          // 2. self.deltaY ka use karke movement ko aur control kiya
          targetY += self.velocityY * 0.08; 
        }
      },
      // Screen touch karte hi rukne ke liye onPress use karein
      onPress: () => {
        targetY = yTrack; // Target ko current position par set kar diya, jisse scroll ruk jayega
      },
      tolerance: 10,
      preventDefault: true,
    });

    return () => {
      obs.kill();
      gsap.ticker.remove(render);
    };
  }, []);



  const UIContent = () => (
    <div className="scroll-content-block" >
      <div className="contact-hero" style={{paddingLeft: "5%", paddingRight:"5%"}}>
        <h1 className="contact-hero-title">GET YOUR CREATIVE CLAUSE</h1>
        
      </div>
      <InfiniteMarquee1/>
      <div className='con-container' >
        <span className='text-label'>Follow us</span>
        <div className='con-text'>
          <Link to="https://www.instagram.com/the.creativeclause" target='_blank'><FaInstagram className='icons' /></Link>
          <Link to="#"><FaFacebookSquare className='icons' /></Link>
          <Link to="https://www.linkedin.com/company/creativeclause/" target='_blank'><FaLinkedin className='icons' /></Link>
        </div>
      </div>S
    </div>
  );

  return (
    <div className="gsap-scroll-wrapper">
      <div className="gsap-scroll-track" ref={trackRef}>
        <UIContent />
        <UIContent />
        <UIContent />
      </div>
    </div>
  );
}