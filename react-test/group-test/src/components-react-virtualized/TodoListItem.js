/*
ToDoListItem.js
render 함수에서 기존에 보여주던 내용을 div로 감쌌습니다. 
이 div는 className으로 TodoListItem-virtualized를 설정하였고, 
props로 받은 style을 적용하였습니다. 
이는 홀수 짝수 항목에 대해 다른 배경 색상을 설정하기 위해서입니다.

그다음에는 TodoListItem.scss 파일에서 최하단에 있던 & + &를 사용한 코드를 지우고, 
코드 최상단에 .TodoListItem-virtualized 코드를 삽입합시다.
*/

//TodoListItem.js
import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
  const { id, text, checked } = todo;
  return (
    <div className='TodoListItem-virtualized' style={style}>
      <div className='TodoListItem'>
        <div
          className={cn('checkbox', { checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className='text'>{text}</div>
        </div>
        <div className='remove' onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);
