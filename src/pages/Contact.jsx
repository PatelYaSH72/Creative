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
  const gap = isMobile ? 100 : 300; // Mobile gap thoda kam
  const itemHeight = window.innerHeight + gap;

  let yTrack = 0;
  let targetY = 0;

  const totalHeight = itemHeight * items.length;
  const wrap = gsap.utils.wrap(-itemHeight, totalHeight - itemHeight);

  const render = () => {
    // Lerp ko constant rakhein smooth transition ke liye
    const lerpFactor = 0.08; 
    yTrack += (targetY - yTrack) * lerpFactor;

    items.forEach((item, i) => {
      const rawY = yTrack + i * itemHeight;
      const cycledY = wrap(rawY);
      gsap.set(item, { y: cycledY, force3D: true }); // force3D: true performance boost deta hai
    });
  };

  gsap.ticker.add(render);

  const obs = Observer.create({
    target: window,
    type: "wheel,touch,pointer",
    onChange: (self) => {
      if (self.event.type === "wheel") {
        targetY -= self.deltaY * 0.8;
      } else {
        // Mobile speed ko balance kiya gaya hai
        targetY += self.velocityY * 0.8; 
      }
    },
    // onPress ko hata diya gaya hai stuttering fix karne ke liye
    tolerance: 5, // Sensitivity thodi badhai
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
          <a href="https://www.instagram.com/the.creativeclause"><FaInstagram className='icons' /></a>
          <a href="#"><FaFacebookSquare className='icons' /></a>
          <a href="https://www.linkedin.com/company/creativeclause/"><FaLinkedin className='icons' /></a>
        </div>
      </div>
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