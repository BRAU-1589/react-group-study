/*
import React, { createContext, useState, useContext } from 'react';

const SpaceshipContext = createContext();
*/

/*
이제 StatusDisplay와 StatusButton 컴포넌트는 
useSpaceship 훅을 사용하여 상태를 직접 접근할 수 있다.
따라서 props를 전달받을 필요가 없어진다
*/


/*
SpaceshipControl 컴포넌트는 
SpaceshipContext에서 제공하는 상태와 상태 설정 함수(setStatus)를 
직접 사용하는 하위 컴포넌트들(StatusDisplay와 StatusButton)에게 
"props"를 전달할 필요가 없어졌다. 


이러한 방식으로, 
우리는 컴포넌트 트리 전반에 걸쳐 "prop drilling" 문제를 해결하고, 
코드의 유지 관리성과 재사용성을 향상시킬 수 있다.

Context API를 사용하면 상태 관리 로직을 더욱 효율적으로 관리할 수 있으며, 
특히 상태를 여러 컴포넌트에서 공유해야 하는 복잡한 애플리케이션에서 
그 장점이 더욱 두드러진다.
*/

/*
export function useSpaceship() {
  return useContext(SpaceshipContext);
}

export function SpaceshipProvider({ children }) {
  const [status, setStatus] = useState('준비');

  return (
    <SpaceshipContext.Provider value={{ status, setStatus }}>
      {children}
    </SpaceshipContext.Provider>
  );
}
*/

/*
import React, { createContext, useState, useContext } from 'react';

const SpaceshipContext = createContext();

export function useSpaceship() {
  return useContext(SpaceshipContext);
}

export function SpaceshipProvider({ children }) {
  const [status, setStatus] = useState('ready');

  return (
    <SpaceshipContext.Provider value={{ status, setStatus }}>
      {children}
    </SpaceshipContext.Provider>
  );
}
*/

//SpaceshipContext.js
import React, { createContext, useContext, useState } from 'react';

const SpaceshipContext = createContext();

export const useSpaceship = () => useContext(SpaceshipContext);

export const SpaceshipProvider = ({ children }) => {
  // 상태의 초기값을 'ready'로 설정
  const [status, setStatus] = useState('ready');

  const value = {
    status,
    setStatus,
  };

  return (
    <SpaceshipContext.Provider value={value}>
      {children}
    </SpaceshipContext.Provider>
  );
};