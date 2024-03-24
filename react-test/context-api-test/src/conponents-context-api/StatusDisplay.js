// context-api 사용
import React from 'react';
import { useSpaceship } from './SpaceshipContext';

function StatusDisplay() {
  const { status } = useSpaceship();

  return <p>현재 상태: {status}</p>;
}

export default StatusDisplay;
