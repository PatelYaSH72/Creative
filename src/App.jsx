import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";

import SmoothScroll from "./SmoothScroll";
import Preloader from "./pages/Preloader";

import "./styles/globals.css";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      {!loading && (
        <>
          {/* ✅ Lenis only once */}
          <SmoothScroll />

          <div className="app">
            <CustomCursor/>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            {/* <Footer /> */}
          </div>
        </>
      )}
    </Router>
  );
}
