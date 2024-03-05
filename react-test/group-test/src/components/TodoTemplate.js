import React from 'react';
import './TodoTemplate.scss';

/**
 * TodoTemplate.js
 * children을 통하여 간단한 레아이웃 구성
 */



const TodoTemplate = ({ children }) => {
  return (
    <div className='TodoTemplate'>
      <div className='app-title'>일정 관리</div>
      <div className='content'>{children}</div>
    </div>
  );
};

export default TodoTemplate;
