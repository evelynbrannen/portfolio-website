import React, { useEffect, useRef, useState } from 'react';
import '../styles/TypingEffect.css';

const TypingEffect = ({ text, speed = 200 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const index = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (text.length === 0) return;

    const updateText = () => {
      setDisplayedText((prev) => {
        const newText = text.slice(0, index.current + 1);
        index.current += 1;
        return newText;
      });
    };

    const startTyping = () => {
      if (index.current < text.length) {
        updateText();
        timerRef.current = setTimeout(startTyping, speed);
      }
    };

    startTyping();

    return () => clearTimeout(timerRef.current);
  }, [text, speed]);

  return (
    <div className="typing-container">
      <span className="typing-text">{displayedText}</span>
      <span className="cursor"></span>
    </div>
  );
};

export default TypingEffect;