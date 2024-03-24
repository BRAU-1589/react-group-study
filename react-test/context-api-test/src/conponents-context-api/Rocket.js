import React, { useEffect, useRef } from 'react';
import './Rocket.css'; // 필요에 따라 CSS 파일을 만들어 스타일을 지정하세요
import rocketImg from './rocket.png';

function Rocket() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const count = 20;
    let i = 0;
    while (i < count) {
      let star = document.createElement('i');
      let x = Math.floor(Math.random() * window.innerWidth);

      let duration = Math.random() * 1;
      let h = Math.random() * 100;

      star.style.left = x + 'px';
      star.style.width = '1px';
      star.style.height = 50 + h + 'px';
      star.style.animationDuration = duration + 's';

      sceneRef.current.appendChild(star);
      i++;
    }
  }, []);

  return (
    <div className='scene' ref={sceneRef}>
      <div className='rocket'>
        <img src={rocketImg} alt='Rocket' />
      </div>
    </div>
  );
}

export default Rocket;
