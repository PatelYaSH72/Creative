import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import cLogo from "../assets/logo_Black.png"
import CcfullLogo from "../assets/CC-black.png"

// ... existing imports

const Navbar = ({ isFallen }) => {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  // ... (imports same rahenge)

 useEffect(() => {
  const isMobile = window.innerWidth <= 768;
  
  if (open) {
    // Expand Logic
    gsap.to(navRef.current, {
      // Mobile par 90% width, desktop par 580px
      width: isMobile ? "90%" : "580px", 
      height: isMobile ? "400px" : "350px", 
      borderRadius: "16px",
      duration: 0.6,
      ease: "power4.inOut",
    });

    gsap.fromTo(
      menuRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, delay: 0.1, duration: 0.4, display: "block" }
    );
  } else {
    // Close Logic
    gsap.to(navRef.current, {
      // Mobile par 320px ya 80%, desktop par 380px
      width: isMobile ? "300px" : "380px",
      height: "56px",
      borderRadius: "15px",
      duration: 0.6,
      ease: "power4.inOut",
    });

    gsap.to(menuRef.current, {
      opacity: 0,
      duration: 0.2,
      display: "none",
    });
  }
}, [open]);

// ... (return statement same rahega)

  return (
    <div ref={navRef} className="navbar expand-nav" style={{zIndex:'10000'}}>
      {/* TOP BAR */}
      <div className="nav-inner">
        {/* LEFT: Logo */}
        <span className="logo"><img className="Clogo" src={cLogo} alt="" /></span>

        {/* CENTER: Agency Name */}
        <span className="agency-name"><img className="CCfullLogo" src={CcfullLogo} alt="" /></span>

        {/* RIGHT: Menu Icon */}
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* EXPANDED MENU */}
      <div ref={menuRef} className="nav-menu">
        <ul>
           <Link onClick={()=>setOpen(false)} to={'/'}><li>Home</li></Link>
           <Link onClick={()=>setOpen(false)} to={'/portfolio'}><li>Portfolio</li></Link>
          <Link onClick={()=>setOpen(false)} to={'/about'}><li>About</li></Link>
          <Link onClick={()=>setOpen(false)} to={'/contact'}><li>Get in Touch</li></Link>
          
        </ul>
      </div>
    </div>
  );
};

export default Navbar;