import React, { useEffect, useRef } from 'react';
import '../styles/About.css';

export default function About() {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    let animationFrameId;

    const smoothScroll = () => {
      scrollPosition += 0.5; // Adjust speed here
      
      // Reset position for infinite loop effect
      if (scrollPosition >= scrollContainer.scrollHeight / 2) {
        scrollPosition = 0;
      }

      scrollContainer.style.transform = `translateY(-${scrollPosition}px)`;
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const content = [
    {
      id: 1,
      type: 'text',
      content: 'WE BELIEVE IN THE POWER OF DESIGN'
    },
    {
      id: 2,
      type: 'paragraph',
      content: 'Our mission is to transform ideas into compelling visual experiences that drive real business results. We combine strategic thinking with creative excellence to deliver solutions that matter.'
    },
    {
      id: 3,
      type: 'text',
      content: 'CREATIVE EXCELLENCE MEETS STRATEGIC THINKING'
    },
    {
      id: 4,
      type: 'paragraph',
      content: 'Founded in 2020, we\'ve partnered with innovative brands across industries, helping them tell their stories and connect with audiences in meaningful ways. Our approach is collaborative, data-driven, and always focused on your success.'
    },
    {
      id: 5,
      type: 'text',
      content: 'YOUR VISION, OUR PASSION'
    },
    {
      id: 6,
      type: 'paragraph',
      content: 'We don\'t just create beautiful designs—we build lasting relationships with our clients. Every project is an opportunity to push boundaries, explore new possibilities, and deliver work we\'re proud to put our name on.'
    },
    {
      id: 7,
      type: 'text',
      content: 'INNOVATION IS IN OUR DNA'
    },
    {
      id: 8,
      type: 'paragraph',
      content: 'Our team stays ahead of industry trends, constantly learning and evolving to bring you the most effective solutions. From brand strategy to digital experiences, we craft every detail with precision and care.'
    }
  ];

  // Duplicate content for seamless infinite scroll
  const duplicatedContent = [...content, ...content];

  return (
    <div className="about">
      <div className="about-hero">
        <div className="about-hero-container">
          <h1 className="about-hero-title">About Us</h1>
          <p className="about-hero-subtitle">
            A creative agency dedicated to bringing exceptional ideas to life
          </p>
        </div>
      </div>

      <div className="vertical-scroll-container">
        <div className="vertical-scroll-content" ref={scrollContainerRef}>
          {duplicatedContent.map((item, index) => (
            <div 
              key={`${item.id}-${index}`}
              className={item.type === 'text' ? 'scroll-text-block' : 'scroll-paragraph-block'}
            >
              {item.type === 'text' ? (
                <h2 className="scroll-text">{item.content}</h2>
              ) : (
                <p className="scroll-paragraph">{item.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="about-values">
        <div className="values-container">
          <h2 className="values-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Innovation</h3>
              <p>Pushing boundaries and exploring new creative territories</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Excellence</h3>
              <p>Delivering nothing less than exceptional quality in everything we do</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Collaboration</h3>
              <p>Working together to achieve extraordinary results</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Creativity</h3>
              <p>Bringing fresh perspectives and original ideas to every project</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
