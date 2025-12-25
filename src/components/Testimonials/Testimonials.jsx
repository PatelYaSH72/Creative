import { useContext, useState, useMemo } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { MyContext } from "../../Context/SectionContext";
import Card1 from "./Card1";
import "../../styles/Testimonials.css";

export default function Testimonials() {
  const { testimonialsContentData } = useContext(MyContext);
  const [active, setActive] = useState(null);

  // ✅ hooks ALWAYS before return
  const offsets = useMemo(
    () => [
      { y: 0, rotate: -6 },
      { y: 18, rotate: 2.5 },
      { y: -14, rotate: -4 },
      { y: 26, rotate: 8 },
    ],
    []
  );

  if (!testimonialsContentData?.length) return null;

  return (
    <>
      <div
        className="section-header testimonials-header"
        style={{ marginBottom: "10px" }}
      >
        <h2>Our Testimonials</h2>
        <p className="section-subtitle">Our Value addition to the partners</p>
      </div>
      <div className="interaction-wrapper">
         <div className="interaction-frame">
            {testimonialsContentData.map((item, index) => {
              const offset = offsets[index % offsets.length];

              return (
                <motion.div
                  key={item.id}
                  className="card"
                  drag={window.innerWidth < 768 ? "y" : false}
                  dragConstraints={{ top: -20, bottom: 20 }}
                  dragElastic={0.15}
                  whileTap={{
                    scale: 0.97,
                  }}
                  initial={{
                    y: offset.y + 20,
                    rotate: offset.rotate,
                    opacity: 0,
                  }}
                  animate={{
                    y: offset.y,
                    rotate: offset.rotate,
                    opacity: 1,
                  }}
                  whileHover={{
                    y: offset.y - 80,
                    rotate: 0,
                    zIndex: 10,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  style={{
                    zIndex: active === index ? 5 : index,
                    y: active === index ? offset.y - 80 : offset.y,
                  }}
                  onClick={() => setActive(index)}
                >
                  <Card1 item={item} />
                </motion.div>
              );
            })}
          </div>
         
        
      </div>
    </>
  );
}
