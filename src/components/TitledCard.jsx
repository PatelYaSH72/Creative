import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Link } from "react-router-dom";
import '../styles/TitledCard.css';

const MotionLink = motion.create(Link);

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  imageSrc,
  id,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}) {
  const ref = useRef(null);

  const x = useMotionValue();
  const y = useMotionValue();
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
  if (!ref.current) return;

  const rect = ref.current.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  // Percentage calculation for the mask position
  const xPercentage = (offsetX / rect.width) * 100;
  const yPercentage = (offsetY / rect.height) * 100;

  // CSS Variable set karna taaki spotlight mouse ke sath chale
  ref.current.style.setProperty(
    "--mask",
    `radial-gradient(circle 120px at ${xPercentage}% ${yPercentage}%, black 100%, transparent 100%)`
  );

  // --- Aapka purana 3D rotation logic yahan se shuru hota hai ---
  const midX = offsetX - rect.width / 2;
  const midY = offsetY - rect.height / 2;

  const rotationX = (midY / (rect.height / 2)) * -rotateAmplitude;
  const rotationY = (midX / (rect.width / 2)) * rotateAmplitude;

  rotateX.set(rotationX);
  rotateY.set(rotationY);
  // ... baaki ka x.set, y.set wahi rahega
}

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

 function handleMouseLeave() {
  opacity.set(0);
  scale.set(1);
  rotateX.set(0);
  rotateY.set(0);
  rotateFigcaption.set(0);
  
  // Mask reset karein taaki grayscale wapas aa jaye
  if (ref.current) {
    ref.current.style.setProperty("--mask", "none");
  }
}

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}

      <MotionLink to={`/portfolio/project/${id}`}
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          style={{
            width: imageWidth,
            height: imageHeight,
            
          }}
        />
        

        {displayOverlayContent && overlayContent && (
          <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>
        )}
      </MotionLink>

      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
