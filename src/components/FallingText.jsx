import { useRef, useEffect } from 'react';
import Matter from 'matter-js';

const FallingText = ({ children, gravity = 2.5, isFallen }) => {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const requestRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/fallingForm.mp3');
    audioRef.current.load();
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    if (!isFallen) {
      cleanUpPhysics();
      const elements = containerRef.current.querySelectorAll('.fall-target');
      elements.forEach(el => {
        el.style.cssText = ""; 
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';
      });
      return;
    }

    if (isFallen && audioRef.current) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
          setTimeout(() => audioRef.current && audioRef.current.pause(), 2000);
        }
      }, 1000);
    }

    const { Engine, World, Bodies, Runner, Body, Constraint } = Matter;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const engine = Engine.create();
    engineRef.current = engine;
    engine.world.gravity.y = gravity;

    // Floor and Walls
    const floor = Bodies.rectangle(width / 2, height + 20, width * 5, 60, { isStatic: true });
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height * 2, { isStatic: true });

    const elements = containerRef.current.querySelectorAll('.fall-target');
    const bodiesData = [...elements].map(el => {
      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // NAVBAR CHECK
      const isNavbar = el.classList.contains('navbar');

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        restitution: isNavbar ? 0 : 0.2, // Navbar को उछालना नहीं है
        frictionAir: isNavbar ? 0.05 : 0.02,
        density: 0.001
      });

      if (isNavbar) {
        // --- ONLY FOR NAVBAR: HANGING LOGIC ---
        const pivot = { x: rect.left, y: rect.top }; // Top-Left corner
        const hangingConstraint = Constraint.create({
          pointA: pivot,
          bodyB: body,
          pointB: { x: -rect.width / 2, y: -rect.height / 2 },
          stiffness: 1,
          length: 0
        });
        World.add(engine.world, hangingConstraint);
        // हल्का सा रोटेशन ताकि वो राइट साइड से झुके
        Body.setAngularVelocity(body, 0.04);
      } else {
        // --- FOR ALL OTHER ELEMENTS: NORMAL FALLING ---
        const randomForceX = (Math.random() - 0.5) * 20;
        Body.setVelocity(body, { x: randomForceX, y: 5 });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
      }

      // Physics to DOM styling
      el.style.width = `${rect.width}px`;
      el.style.height = `${rect.height}px`;
      el.style.position = 'fixed';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.zIndex = isNavbar ? '10005' : '9999';
      el.style.pointerEvents = 'none';

      return { el, body };
    });

    World.add(engine.world, [floor, leftWall, rightWall, ...bodiesData.map(b => b.body)]);

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    const updateLoop = () => {
      bodiesData.forEach(({ body, el }) => {
        const { x, y } = body.position;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      requestRef.current = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => cleanUpPhysics();
  }, [isFallen, gravity]);

  const cleanUpPhysics = () => {
    if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
    if (engineRef.current) {
      Matter.World.clear(engineRef.current.world);
      Matter.Engine.clear(engineRef.current);
    }
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      {children}
    </div>
  );
};

export default FallingText;