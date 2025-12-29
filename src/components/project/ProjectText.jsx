import { useEffect, useRef } from "react";
import gsap from "gsap";

const ProjectText = ({ title, description, active, index }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!active) return;

    gsap.fromTo(
      ref.current.querySelectorAll(".reveal"),
      { yPercent: 120 },
      {
        yPercent: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
      }
    );
  }, [active]);

  return (
    <div className="project-text" ref={ref}>
      <span className="project-index">0{index + 1}</span>
      <h2 className="reveal">{title}</h2>
      <p className="reveal">{description}</p>
    </div>
  );
};

export default ProjectText;
