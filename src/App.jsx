import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar.jsx";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";

import SmoothScroll from "./SmoothScroll";
import Preloader from "./pages/Preloader";

import "./styles/globals.css";
import CustomCursor from "./components/CustomCursor";
import ContactForm from "./pages/ContectForm.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      {loading && <Preloader onFinish={() => setLoading(false)} />}
        
     
        <>
        <ToastContainer position="top-right" theme="light" />
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
                <Route path="/contact-form" element={<ContactForm />} />
              </Routes>
            </main>
            {/* <Footer /> */}
          </div>
        </>
      
    </Router>
  );
}
