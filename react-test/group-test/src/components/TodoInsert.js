import React, { useCallback, useState } from 'react';
import './TodoInsert.scss';
import { MdAdd } from 'react-icons/md';

/**
 * TodoInsert.js
 * 할 일 입력 구현
 */


const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue('');
      e.preventDefault();
    },
    [onInsert, value]
  );

  return (
    <form className={'TodoInsert'} onSubmit={onSubmit}>
      <input
        type='text'
        placeholder={'할 일을 입력 하세요'}
        onChange={onChange}
        value={value}
      />
      <button type={'submit'}>
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
