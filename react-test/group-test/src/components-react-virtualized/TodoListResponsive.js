import React, { useState, useEffect, useCallback } from 'react';
import TodoListItem from './TodoListItemResponsive';
import './TodoList.scss';
import { List } from 'react-virtualized';

const TodoList = ({ todos, onRemove, onToggle }) => {
  // 화면 크기를 상태로 관리
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos]
  );

  // 반응형으로 width와 height 결정
  const listWidth = Math.min(512, windowSize.width - 20); // 화면 크기에 따라 조정, 여백 고려
  const listHeight = Math.max(300, windowSize.height - 150); // 최소 높이 설정, 헤더나 푸터 공간 고려

  return (
    <List
      className='TodoList'
      width={listWidth} // 동적으로 조정된 전체 크기
      height={listHeight} // 동적으로 조정된 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
    />
  );
};

export default React.memo(TodoList);
