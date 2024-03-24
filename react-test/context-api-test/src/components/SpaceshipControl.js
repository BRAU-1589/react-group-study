import React, { useState } from 'react';
import StatusDisplay from './StatusDisplay';
import StatusButton from './StatusButton';

function SpaceshipControl() {
  const [status, setStatus] = useState('준비');

  return (
    <div>
      <h2>컨트롤 패널</h2>
      <StatusDisplay status={status} />
      <StatusButton setStatus={setStatus} />
    </div>
  );
}

export default SpaceshipControl;
