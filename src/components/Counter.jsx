import React, { useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform} from "framer-motion";
import { useRef } from "react";
import "../styles/Counter.css";

const SingleCounter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2000; // 2 seconds
      let startTime = null;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for a "smooth stop"
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        const currentCount = Math.floor(easeOutExpo * end);
        
        setDisplayValue(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue.toLocaleString()}</span>;
};

const Counter = () => {
  const stats = [
    { target: "2020", title: "First Clause Written"},
    { target: "20", title: "Remote Team Members"},
    { target: "5", title: "Years of Experience"},
    { target: "150", title: "Product Demos"},
  ];

  return (
    <section className="counter-wrapper">
      <div className="counter-container">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {/* <div className="accent-line" /> */}
            <div className="number-container">
              <SingleCounter value={stat.target} />
              {/* <span className="suffix">{stat.suffix}</span> */}
            </div>
            <div className="text-container">
              <span className="title-main">{stat.title}</span>
             
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Counter;