/*
import React from 'react';
import ColorContext from '../contexts/color';

const ColorBox = () => {
  return (
    <ColorContext.Consumer>
      {(value) => (
        <div
          style={{
            width: '64px',
            height: '64px',
            background: value.color,
          }}
        />
      )}
    </ColorContext.Consumer>
  );
};
export default ColorBox;
*/

/*
import React from 'react';
import { ColorConsumer } from '../contexts/color';

const ColorBox = () => {
  return (
    <ColorConsumer>
      {(value) => (
        <>
          <div
            style={{
              width: '64px',
              height: '64px',
              background: value.state.color,
            }}
          />
          <div
            style={{
              width: '32px',
              height: '32px',
              background: value.state.subcolor,
            }}
          />
        </>
      )}
    </ColorConsumer>
  );
};
export default ColorBox;
*/

/*
import React from 'react';
import { ColorConsumer } from '../context/color';

const ColorBox = () => {
  return (
    <ColorConsumer>
      {({ actions }) => (
        <div style={{ display: 'flex' }}>
          {colors.map((color) => (
            <div
              key={color}
              style={{
                background: color,
                width: '24px',
                height: '24px',
                cursor: 'pointer',
              }}
              onClick={() => actions.setColor(color)}
              onContextMenu={(e) => {
                e.preventDefault();
                actions.setSubcolor(color);
              }}
            />
          ))}
        </div>
      )}
    </ColorConsumer>
  );
};
export default ColorBox;
*/

/*
import { ColorConsumer } from "../context/color";

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

export default function SelectColors() {
  return (
    <div>
      <h2>색상을 선택하세요.</h2>
      <ColorConsumer>
        {({ actions }) => (
          <div style={{ display: "flex" }}>
            {colors.map((color) => (
              <div
                key={color}
                style={{
                  background: color,
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
                onClick={() => actions.setColor(color)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  actions.setSubcolor(color);
                }}
              />
            ))}
          </div>
        )}
      </ColorConsumer>
      <hr />
    </div>
  );
}
*/


import { ColorConsumer } from "../context/color";

export default function ColorBox() {
  return (
    <ColorConsumer>
      {({ state }) => (
        <>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: state.color,
            }}
          />
          <div
            style={{
              width: "32px",
              height: "32px",
              background: state.subcolor,
            }}
          />
        </>
      )}
    </ColorConsumer>
  );
}


/*
import ColorContext from "../context/color";
*/

/*
import { useContext } from 'react';
import { ColorContext } from '../context/color';

export default function ColorBox() {
  const { state } = useContext(ColorContext);
  return (
    <>
      <div
        style={{
          width: "64px",
          height: "64px",
          background: state.color,
        }}
      />
      <div
        style={{
          width: "32px",
          height: "32px",
          background: state.subcolor,
        }}
      />
    </>
  );
}
*/


/*
import React, { useContext } from 'react';
import { ColorContext } from '../context/color';

function ColorBox() {
  const { state, actions } = useContext(ColorContext);
  const { color, subcolor } = state;
  const { setColor, setSubcolor } = actions;

  return (
    <div>
      <div>
        Color: {color}, Subcolor: {subcolor}
      </div>
      <button onClick={() => setColor('blue')}>Set Color to Blue</button>
      <button onClick={() => setSubcolor('green')}>
        Set Subcolor to Green
      </button>
    </div>
  );
}

export default ColorBox;
*/