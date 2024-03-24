/*

// SpaceshipControl.js
import React from 'react';
import { useSpaceship } from './SpaceshipContext';
//import './SpaceshipControl.css'; // 스타일시트 임포트

function SpaceshipControl() {
  const { status, setStatus } = useSpaceship();

  // 상태에 따른 클래스 이름 설정
  const containerClass = `spaceship-container ${status}`;

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);
    // 상태 변경 시 사운드 효과 재생 (선택적)
    // const audio = new Audio('/path/to/sound/effect.mp3');
    // audio.play();
  };

  return (
    <div className={containerClass}>
      <h2>우주선 상태: {status}</h2>
      <button onClick={() => handleChangeStatus('ready')}>준비</button>
      <button onClick={() => handleChangeStatus('flying')}>비행 중</button>
      <button onClick={() => handleChangeStatus('docking')}>도킹</button>
      <div className='status-animation'></div>
    </div>
  );
}

export default SpaceshipControl;
*/
/*
import React from 'react';
import { useSpaceship } from './SpaceshipContext';
// 스타일시트 임포트가 주석 처리되었음. 필요에 따라 임포트할 수 있습니다.

function SpaceshipControl() {
  const { status, setStatus } = useSpaceship();

  // 상태에 따른 영어 클래스 이름 설정
  const containerClass = `spaceship-container ${status}`;

  // 상태에 따른 한글 상태 표시
  const statusText = {
    ready: '준비',
    flying: '비행 중',
    docking: '도킹',
  };

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);
    // 상태 변경 시 사운드 효과 재생 (선택적)
    // const audio = new Audio('/path/to/sound/effect.mp3');
    // audio.play();
  };

  return (
    <div className={containerClass}>
      <h2>우주선 상태: {statusText[status]}</h2>
      <button onClick={() => handleChangeStatus('ready')}>준비</button>
      <button onClick={() => handleChangeStatus('flying')}>비행 중</button>
      <button onClick={() => handleChangeStatus('docking')}>도킹</button>
      <div className='status-animation'></div>
    </div>
  );
}



export default SpaceshipControl;

*/



//SpaceshipControl.js
import React from 'react';
import { useSpaceship } from './SpaceshipContext';
import Rocket from './Rocket';

// 스타일시트 임포트가 주석 처리되었음. 필요에 따라 임포트할 수 있습니다.

function SpaceshipControl() {
  const { status, setStatus } = useSpaceship();

  // 상태에 따른 영어 클래스 이름 설정
  const containerClass = `spaceship-container ${status}`;

  // 상태에 따른 한글 상태 표시
  const statusText = {
    ready: '준비',
    flying: '비행 중',
    docking: '도킹',
  };

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);
    // 상태 변경 시 사운드 효과 재생 (선택적)
    // const audio = new Audio('/path/to/sound/effect.mp3');
    // audio.play();
  };

  return (
    <div className={containerClass}>
      <h2>우주선 상태: {statusText[status]}</h2>
      <button onClick={() => handleChangeStatus('ready')}>준비</button>
      <button onClick={() => handleChangeStatus('flying')}>비행 중</button>
      <button onClick={() => handleChangeStatus('docking')}>도킹</button>
      <div className='status-animation'></div>
      <Rocket />
    </div>
  );
}

export default SpaceshipControl;



/*
import React, { useEffect, useState } from 'react';
import { useSpaceship } from './SpaceshipContext';
import './Rocket.css'; // 필요에 따라 CSS 파일을 만들어 스타일을 지정하세요
import rocketImg from './rocket.png';

function SpaceshipControl() {
  const { status, setStatus } = useSpaceship();
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const count = 20;
    const newStars = Array.from({ length: count }).map(() => ({
      x: Math.floor(Math.random() * window.innerWidth),
      height: Math.random() * 100,
      duration: Math.random() * 1,
    }));

    setStars(newStars);
  }, []);

  return (
    <div className={`spaceship-container ${status}`}>
      <h2>
        우주선 상태:{' '}
        {status === 'ready' ? '준비' : status === 'flying' ? '비행 중' : '도킹'}
      </h2>
      <button onClick={() => setStatus('ready')}>준비</button>
      <button onClick={() => setStatus('flying')}>비행 중</button>
      <button onClick={() => setStatus('docking')}>도킹</button>
      <div className='status-animation'></div>
      <div className='scene'>
        {stars.map((star, index) => (
          <i
            key={index}
            style={{
              left: star.x + 'px',
              width: '1px',
              height: 50 + star.height + 'px',
              animationDuration: star.duration + 's',
            }}
          />
        ))}
        <div className='rocket'>
          <img src={rocketImg} alt='Rocket' />
        </div>
      </div>
    </div>
  );
}

export default SpaceshipControl;
*/