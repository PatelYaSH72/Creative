import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';

const FallingText = ({
  children,
  className = '',
  trigger = false,
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  audioPath = '/fallingForm.mp3' // Yahan apni audio file ka path dalein
}) => {
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (trigger === true) {
      setEffectStarted(true);

      // AUDIO LOGIC: 500ms delay ke baad play hoga
      const timer = setTimeout(() => {
        const audio = new Audio(audioPath);
        audio.play().catch(err => console.log("Audio play blocked by browser:", err));
      }, 500);

      return () => clearTimeout(timer); // Cleanup timer
    } else {
      setEffectStarted(false);
      const targets = containerRef.current?.querySelectorAll('.fall-target');
      if (targets) {
        targets.forEach(elem => {
          elem.style.removeProperty('position');
          elem.style.removeProperty('top');
          elem.style.removeProperty('left');
          elem.style.removeProperty('transform');
          elem.style.removeProperty('width');
          elem.style.removeProperty('height');
          elem.style.removeProperty('z-index');
          elem.style.removeProperty('pointer-events');
        });
      }
    }
  }, [trigger, audioPath]);

  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width: screenWidth,
        height: screenHeight,
        background: backgroundColor,
        wireframes
      }
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };
    
    const floor = Bodies.rectangle(screenWidth / 2, screenHeight + 25, screenWidth, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, screenHeight / 2, 50, screenHeight, boundaryOptions);
    const rightWall = Bodies.rectangle(screenWidth + 25, screenHeight / 2, 50, screenHeight, boundaryOptions);
    const ceiling = Bodies.rectangle(screenWidth / 2, -25, screenWidth, 50, boundaryOptions);

    const targets = containerRef.current.querySelectorAll('.fall-target');
    
    const wordBodies = [...targets].map(elem => {
      const rect = elem.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // PHYSICS LOGIC: 100% SAME
      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0,      
        frictionAir: 0,      
        friction: 0
      });

      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.02);
      
      elem.style.width = `${rect.width}px`;
      elem.style.height = `${rect.height}px`;
      elem.style.position = 'fixed'; 
      elem.style.zIndex = '9999';
      elem.style.pointerEvents = 'auto'; 
      elem.style.cursor = 'grab';

      return { elem, body };
    });

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false }
      }
    });

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let animationId;
    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        
        if (body.isStatic) {
           elem.style.cursor = 'grabbing';
        }
      });
      Matter.Engine.update(engine);
      animationId = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      cancelAnimationFrame(animationId);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
      <div 
        ref={canvasContainerRef} 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          zIndex: effectStarted ? 9998 : -1,
          pointerEvents: effectStarted ? 'auto' : 'none' 
        }} 
      />
    </div>
  );
};

export default FallingText;