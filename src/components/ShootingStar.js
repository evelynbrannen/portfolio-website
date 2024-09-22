import React, { useEffect, useState } from 'react';
import '../styles/ShootingStar.css';

const ShootingStar = () => {
  const [visible, setVisible] = useState(false);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const calculateAngle = () => {
      const vwToPx = window.innerWidth / 100;
      const vhToPx = window.innerHeight / 100;
    
      const startX = 100 * vwToPx;
      const endX = -10 * vwToPx;
      const startY = 0 * vhToPx;
      const endY = 40 * vhToPx;
    
      const deltaX = endX - startX;
      const deltaY = endY - startY;
    
      const angleInRadians = Math.atan2(deltaY, deltaX);
      const angleInDegrees = angleInRadians * (180 / Math.PI);
      setAngle(angleInDegrees - 90);
    };
    

    calculateAngle();

    const randomInterval = Math.random() * 5000 + 5000;
    const timeout = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 1500);
    }, randomInterval);

    return () => clearTimeout(timeout);
  }, [visible]);

  return visible ? (
    <div
      className="shooting-star"
      style={{ transform: `rotate(${angle}deg)` }}
    ></div>
  ) : null;
};

export default ShootingStar;
