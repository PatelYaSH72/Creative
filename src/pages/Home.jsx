import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="aurora-container">
          <div className="aurora aurora-1"></div>
          <div className="aurora aurora-2"></div>
          <div className="aurora aurora-3"></div>
        </div>
        <div className="hero-container">
          <div className="hero-left">
            <h1 className="hero-title">
              We Create
              <br />
              <span className="hero-title-highlight">Digital Magic</span>
            </h1>
            <p className="hero-description">
              A premium creative agency crafting innovative solutions that bring your brand vision to life with cutting-edge design and development.
            </p>
            <Link to="/portfolio" className="hero-cta">
              View Our Work
            </Link>
          </div>

          <div className="hero-right">
            <div className="hero-image-wrapper">
              {/* <div className="accent-blob accent-blob-1"></div>
              <div className="accent-blob accent-blob-2"></div> */}
              <img 
                src=""
                alt="Flamingo"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}