import React from 'react';
import ShootingStar from './ShootingStar';
import '../styles/Stars.css';

const Stars = () => {
  return (
    <div className="stars-container">
      <ShootingStar></ShootingStar>
      {[...Array(30)].map((_, index) => (
        <div
          key={index}
          className="star"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >*</div>
      ))}
    </div>
  );
};

export default Stars;
