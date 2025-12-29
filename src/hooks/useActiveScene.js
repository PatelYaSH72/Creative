import { useEffect, useState } from "react";

const useActiveScene = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll(".project-scene");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
};

export default useActiveScene;
