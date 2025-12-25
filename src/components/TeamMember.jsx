import React, { useState, useEffect, useContext } from 'react';
import "../styles/TeamMember.css";
import { gsap } from "gsap";
import ColorThief from 'colorthief';
import { X, Linkedin, Mail, Phone, Instagram } from "lucide-react";

import { MyContext } from '../Context/SectionContext';

const TeamMember = () => {

  const {team} = useContext(MyContext);
   

  const [hoveredMember, setHoveredMember] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedMember, setSelectedMember] = useState(null);
  const [extractedTheme, setExtractedTheme] = useState({ 
    bg: '#ffffff', 
    text: '#222222', 
    accent: '#961919' 
  });

    
    
  const handleMemberClick = (member) => {
    setSelectedMember(member);
    
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = member.image;
    
    img.onload = () => {
      const colorThief = new ColorThief();
      // Image se 5 dominant colors ki palette nikaali
      const palette = colorThief.getPalette(img, 5); 
      
      // Randomly palette mese colors assign karna
      const bgRgb = palette[0];      // 1st random color for BG
      const textRgb = palette[2];    // 3rd random color for Text
      const accentRgb = palette[1];  // 2nd random color for Accent

      // --- Contrast Check Logic ---
      // Background aur Text ki brightness check karna taaki text dikhta rahe
      const bgBrightness = (bgRgb[0] * 299 + bgRgb[1] * 587 + bgRgb[2] * 114) / 1000;
      const textBrightness = (textRgb[0] * 299 + textRgb[1] * 587 + textRgb[2] * 114) / 1000;

      // Agar BG aur Text dono halke (light) ya dono gehre (dark) hain, 
      // to text ko contrast provide karna
      let finalTextColor = `rgb(${textRgb[0]}, ${textRgb[1]}, ${textRgb[2]})`;
      if (Math.abs(bgBrightness - textBrightness) < 100) {
        finalTextColor = bgBrightness > 125 ? '#111111' : '#ffffff';
      }

      setExtractedTheme({
        bg: `rgb(${bgRgb[0]}, ${bgRgb[1]}, ${bgRgb[2]})`,
        text: finalTextColor,
        accent: `rgb(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]})`
      });
    };
  };

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(".member-detail-card", 
        { scale: 0.9, opacity: 0, y: 50 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }
      );
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedMember]);

  return (
    <div className={`portfolio ${selectedMember ? "modal-open" : ""}`}>
      <section className="team-section">
        <div className="team-container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p className="section-subtitle">Randomly generated themes based on profile photography</p>
          </div>

          <div className="team-list">
            {team?.map((member) => (
              <div
                key={member.id}
                className="team-member"
                onMouseMove={(e) => { setMousePosition({ x: e.clientX, y: e.clientY }); setHoveredMember(member); }}
                onMouseLeave={() => setHoveredMember(null)}
                onClick={() => handleMemberClick(member)}
              >
                <span className="team-member-name">{member.name}</span>
                <span className="team-member-role">{member.role}</span>
              </div>
            ))}
          </div>

          {hoveredMember && !selectedMember && (
            <div
              className="team-preview"
              style={{ left: `${mousePosition.x + 20}px`, top: `${mousePosition.y - 120}px` }}
            >
              <img src={hoveredMember.image} alt={hoveredMember.name} />
            </div>
          )}
        </div>
      </section>

      {selectedMember && (
        <div className="member-detail-overlay" onClick={() => setSelectedMember(null)}>
          <div
            className="member-detail-card"
            style={{ backgroundColor: extractedTheme.bg, color: extractedTheme.text }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setSelectedMember(null)} style={{ color: extractedTheme.text }}>
              <X size={29} />
            </button>

            <div className="detail-grid">
              <div className="detail-image">
                <img src={selectedMember.image} alt={selectedMember.name} />
              </div>

              <div className="detail-content">
                <span className="detail-role" style={{ color: extractedTheme.accent, fontWeight: 'bold' }}>
                  {selectedMember.role}
                </span>
                <h2 className="detail-name" style={{ color: 'inherit' }}>{selectedMember.name}</h2>
                <p className="detail-desc" style={{ opacity: 0.85, color: 'inherit' }}>
                  {selectedMember.description}
                </p>

                <div className="detail-contact">
                  <a href={`mailto:${selectedMember.email}`} className="contact-item" style={{ color: 'inherit' }}>
                    <Mail size={18} color={extractedTheme.accent} /> {selectedMember.email}
                  </a>
                  <a href={`tel:${selectedMember.phone}`} className="contact-item" style={{ color: 'inherit' }}>
                    <Phone size={18} color={extractedTheme.accent} /> {selectedMember.phone}
                  </a>
                </div>

                <div className="detail-socials">
                  <a href={selectedMember.socials.linkedin} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
                    <Linkedin size={24} />
                  </a>
                  <a href={selectedMember.socials.twitter} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMember;