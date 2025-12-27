import React, { useContext, useState } from "react";
import "../styles/Portfolio.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { MyContext } from "../Context/SectionContext";

export default function Portfolio() {

  const {services} = useContext(MyContext)

  useEffect(() => {
    const cards = document.querySelectorAll(".service-card");

    cards.forEach((card) => {
      const overlay = card.querySelector(".service-title-overlay");
      const title = card.querySelector(".service-title");
      const image = card.querySelector(".service-image");

      const tl = gsap.timeline({ paused: true });

      tl.to(image, {
        scale: 1.08,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          overlay,
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          0
        )
        .to(
          title,
          {
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          0.1
        );

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());
    });
  }, []);
  

 

  const process = [
    {
      id: 1,
      title: "Research",
      description: "Deep dive into your business, audience, and competitors",
    },
    {
      id: 2,
      title: "Design",
      description:
        "Crafting beautiful, functional solutions tailored to your needs",
    },
    {
      id: 3,
      title: "Develop",
      description: "Building with cutting-edge technology and best practices",
    },
    {
      id: 4,
      title: "Launch",
      description:
        "Deploying your project and ensuring everything runs smoothly",
    },
  ];


  const handleMouseMove = (e, member) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setHoveredMember(member);
  };

  const handleMouseLeave = () => {
    setHoveredMember(null);
  };

  return (
    <div
      className={`portfolio `}
    
    >
      {/* What We Do Section */}
      <section className="services-section">
        <div className="services-container">
          <div className="section-header">
            <h2>What We Do</h2>
            <p className="section-subtitle">
              Comprehensive creative solutions tailored to elevate your brand
            </p>
          </div>

          <div className="services-grid">
            {services?.map((service) => (
              <div
                key={service.id}
                className="service-card"
                data-service-id={service.id}
              >
                <div className="service-image-container">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-image"
                  />

                  {/* Hover Title */}
                  <div className="service-title-overlay">
                    <h3 className="service-title">{service.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="process-section">
        <div className="process-container">
          <div className="section-header">
            <h2>Our Process</h2>
            <p className="section-subtitle">
              A proven methodology that delivers exceptional results
            </p>
          </div>

          <div className="process-timeline">
            {process.map((step, index) => (
              <div key={step.id} className="process-step">
                <div className="process-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Your Quote Section */}
      <section className="quote-section">
        <div className="quote-container">
          <h2 className="quote-title">Get Your Quote Now</h2>
          <p className="quote-description">
            Ready to bring your vision to life? Let's start the conversation.
          </p>
          <a href="/contact" className="quote-cta">
            Start Your Project
          </a>
        </div>
      </section>

      {/* Team List Section */}
      

      {/* <TeamMember/> */}
    </div>
  );
}
