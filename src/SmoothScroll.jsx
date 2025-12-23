import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (lenisRef.current) return;

    const lenis = new Lenis({
      lerp: 0.08,
  smoothWheel: true,
  // Is line ko change karein:
  smoothTouch: true, // Touch devices par smooth scroll enable karne ke liye
  syncTouch: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // 🔥 route change fix
  useEffect(() => {
    lenisRef.current?.resize();
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  return null;
}
