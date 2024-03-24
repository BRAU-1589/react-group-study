import React from 'react';

function StatusButton({ setStatus }) {
  return (
    <div>
      <button onClick={() => setStatus('준비')}>준비</button>
      <button onClick={() => setStatus('비행 중')}>비행 중</button>
      <button onClick={() => setStatus('도킹')}>도킹</button>
    </div>
  );
}

export default StatusButton;
