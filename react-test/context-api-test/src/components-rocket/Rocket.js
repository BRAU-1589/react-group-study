// Rocket.js
import React, { useEffect } from 'react';
import { useRocket } from './RocketContext';
import './Rocket.css'; // CSS 스타일 정의
import rocketImg from './rocket.png';

function Rocket() {
  const { stars, createStars } = useRocket();

  useEffect(() => {
    createStars();
  }, [createStars]);

  return (
    <div className='scene'>
      {stars.map((star) => (
        <i
          key={star.id}
          style={{
            left: star.x + 'px',
            width: '1px',
            height: 50 + star.height + 'px',
            animationDuration: star.duration + 's',
          }}
        />
      ))}
      <img src={rocketImg} alt='Rocket' />
    </div>
  );
}

export default Rocket;
