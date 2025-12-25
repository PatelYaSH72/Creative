import { useEffect, useState } from "react";

const TextShuffle = ({ texts }) => {
  const [index, setIndex] = useState(-1);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 🛑 LAST TEXT → no fade-out, no timeout, no out delay
    

    // 🟢 Hello hold
    if (index === -1) {
      const start = setTimeout(() => setIndex(0), 500);
      return () => clearTimeout(start);
    }

    // 🔁 Normal shuffle (fade out → next)
    const fadeOut = setTimeout(() => {
      setVisible(false);
    }, 300);

    const next = setTimeout(() => {
      setIndex((prev) => prev + 1);
      setVisible(true);
    }, 300);

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(next);
    };
  }, [index, texts.length]);

  return (
    <span
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      {index === -1 ? "Hello" : texts[index]}
    </span>
  );
};

export default TextShuffle;
