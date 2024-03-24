/*
https://woongtech.tistory.com/entry/%EB%A6%AC%EC%95%A1%ED%8A%B8-Context-API-reacttypescript
import { createContext } from 'react';

const ColorContext = createContext({ color: 'black' });

export default ColorContext;
*/

/*
import { createContext, useState } from 'react';

const ColorContext = createContext({
  state: { color: 'black', subcolor: 'red' },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('black');
  const [subcolor, setSubcolor] = useState('red');

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

const ColorConsumer = ColorContext.Consumer;
export { ColorProvider, ColorConsumer };

export default ColorContext;
*/

// src/contexts/color.jsx
/*
import { createContext, useState } from "react";

interface ColorContextType {
  state: { color: string; subcolor: string };
  actions: {
    setColor: React.Dispatch<React.SetStateAction<string>>;
    setSubcolor: React.Dispatch<React.SetStateAction<string>>;
  };
}

const ColorContext = createContext<ColorContextType>({
  state: { color: "black", subcolor: "red" },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

function ColorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState("black");
  const [subcolor, setSubcolor] = useState("red");

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}

const { Consumer: ColorConsumer } = ColorContext;

export { ColorProvider, ColorConsumer };

export default ColorContext;
*/

/*
import React, { createContext, useState } from 'react';


const ColorContext = createContext({
  state: { color: 'black', subcolor: 'red' },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

function ColorProvider({ children }) {
  const [color, setColor] = useState('black');
  const [subcolor, setSubcolor] = useState('red');

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}

const ColorConsumer = ColorContext.Consumer;

export { ColorProvider, ColorConsumer, ColorContext };
*/

// color.jsx
import React, { createContext, useState } from 'react';

const ColorContext = createContext({
  state: { color: 'black', subcolor: 'red' },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

function ColorProvider({ children }) {
  const [color, setColor] = useState('black');
  const [subcolor, setSubcolor] = useState('red');

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}

const ColorConsumer = ColorContext.Consumer;

export { ColorProvider, ColorConsumer, ColorContext };