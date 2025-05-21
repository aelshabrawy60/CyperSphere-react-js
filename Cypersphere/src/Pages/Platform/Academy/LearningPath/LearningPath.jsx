import React, { useCallback } from 'react';

import './LearningPath.css';
import Levels from '../../../../Components/Platform/Levels/Levels';
import AddLevel from '../../../../Components/Admin/AddLevel';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import BackgroundParticles from '../../../../Components/Platform/BackgroundParticles/BackgroundParticles';

function LearningPath() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  function onAdd() {
    window.location.reload();
  }

  return (
    <div className='learning-path-bg' style={{ position: 'relative' }}>
      <BackgroundParticles/>

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
