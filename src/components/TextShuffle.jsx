import { useEffect, useState } from "react";

const TextShuffle = ({ texts }) => {
  const [index, setIndex] = useState(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 1. Sabse pehle word ko fade-in karo
    if (index === -1 && !visible) {
      const fadeIn = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(fadeIn);
    }

    // 2. STOP: Agar saare words khatam ho gaye toh ruk jao
    if (index >= texts.length - 1) return;

    // 3. HOLD LOGIC: Pehla word (index -1) 600ms hold karega, baaki 400ms
    const currentHoldTime = index === -1 ? 600 : 250; 

    const fadeOutTimer = setTimeout(() => {
      setVisible(false);
    }, currentHoldTime);

    const nextWordTimer = setTimeout(() => {
      setIndex((prev) => prev + 1);
      setVisible(true);
    }, index === -1 ? 600 : 150); // Transition ke liye extra gap

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(nextWordTimer);
    };
  }, [index, visible, texts.length]); // visible ko track karna zaroori hai initial fade ke liye

  return (
    <span
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease-in-out",
        fontWeight: "900",
      }}
    >
      {index === -1 ? "CRE8TIVE CLAUSE" : texts[index]}
    </span>
  );
};

export default TextShuffle;