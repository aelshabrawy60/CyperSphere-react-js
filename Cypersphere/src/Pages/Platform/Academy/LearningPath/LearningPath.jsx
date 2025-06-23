import React, { useCallback } from 'react';

import './LearningPath.css';
import Levels from '../../../../Components/Platform/Levels/Levels';
import AddLevel from '../../../../Components/Admin/AddLevel';

function LearningPath() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  function onAdd() {
    window.location.reload();
  }

  return (
    <div className='learning-path-bg' style={{ position: 'relative' }}>

      <div className='p-4' style={{ position: 'relative', zIndex: 1 }}>
        {isAdmin && (
          <div className='mb-3'>
            <AddLevel onAdd={onAdd} />
          </div>
        )}
        <Levels />
      </div>
    </div>
  );
}

export default LearningPath;
