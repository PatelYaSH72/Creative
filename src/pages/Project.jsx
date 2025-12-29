import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import "../styles/Project.css";

gsap.registerPlugin(ScrollTrigger);

const PremiumProjectShowcase = ({
  index = "01",
  title = "Creative Portfolio",
  description = "A premium light aesthetic project with parallax and motion.",
  image,
}) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const threeRef = useRef(null);

  useEffect(() => {
    /* ================= GSAP TEXT ================= */
    const ctx = gsap.context(() => {
      gsap.from(".pp-index", {
        y: 30,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".pp-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".pp-desc", {
        y: 40,
        opacity: 0,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!threeRef.current) return;

    /* ================= THREE SETUP ================= */
    const scene = new THREE.Scene();

    const width = threeRef.current.clientWidth;
    const height = threeRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    threeRef.current.appendChild(renderer.domElement);

    const texture = new THREE.TextureLoader().load(image);
    const geometry = new THREE.PlaneGeometry(1.2, 1.6, 32, 32); // 3:4 ratio
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /* ================= PARALLAX ================= */
    const mouse = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.35;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.35;
    };

    window.addEventListener("mousemove", onMouseMove);

    let raf;
    const animate = () => {
      mesh.rotation.y += (mouse.x - mesh.rotation.y) * 0.05;
      mesh.rotation.x += (-mouse.y - mesh.rotation.x) * 0.05;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    animate();

    /* ================= CLEANUP ================= */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();

      if (threeRef.current?.contains(renderer.domElement)) {
        threeRef.current.removeChild(renderer.domElement);
      }
    };
  }, [image]);

  return (
    <section ref={sectionRef} className="pp-section">
      <div ref={textRef} className="pp-text">
        <span className="pp-index">{index}</span>
        <h2 className="pp-title">{title}</h2>
        <p className="pp-desc">{description}</p>
      </div>

      <div className="pp-image">
        <div ref={threeRef} className="pp-three" />
      </div>
    </section>
  );
};

export default PremiumProjectShowcase;
