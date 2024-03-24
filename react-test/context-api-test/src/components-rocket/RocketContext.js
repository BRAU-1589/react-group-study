// RocketContext.js
import React, { createContext, useState, useContext } from 'react';

const RocketContext = createContext();

export const useRocket = () => useContext(RocketContext);

export const RocketProvider = ({ children }) => {
  const [stars, setStars] = useState([]);

  // 별 생성 함수
  const createStars = () => {
    const newStars = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      newStars.push({
        id: i,
        x: Math.floor(Math.random() * window.innerWidth),
        height: Math.random() * 100,
        duration: Math.random() * 1,
      });
    }
    setStars(newStars);
  };

  return (
    <RocketContext.Provider value={{ stars, createStars }}>
      {children}
    </RocketContext.Provider>
  );
};
