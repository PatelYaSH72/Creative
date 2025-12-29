import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreePoster = ({ image }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // ===== SETUP =====
    const scene = new THREE.Scene();

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 2.4;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const canvas = renderer.domElement;
    mountRef.current.appendChild(canvas);

    // ===== TEXTURE =====
    const texture = new THREE.TextureLoader().load(image);
    texture.minFilter = THREE.LinearFilter;

    // ===== GEOMETRY (3:4) =====
    const geometry = new THREE.PlaneGeometry(1.2, 1.6, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    // ===== MOUSE PARALLAX =====
    const mouse = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };

    window.addEventListener("mousemove", onMouseMove);

    // ===== ANIMATION =====
    let rafId;
    const animate = () => {
      mesh.rotation.y += (mouse.x - mesh.rotation.y) * 0.06;
      mesh.rotation.x += (-mouse.y - mesh.rotation.x) * 0.06;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // ===== CLEANUP (SAFE) =====
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();

      if (mountRef.current && canvas.parentNode === mountRef.current) {
        mountRef.current.removeChild(canvas);
      }
    };
  }, [image]);

  return <div ref={mountRef} className="three-poster" />;
};

export default ThreePoster;