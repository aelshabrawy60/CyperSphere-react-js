import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import './LearningPath.css';
import Levels from '../../../../Components/Platform/Levels/Levels';
import AddLevel from '../../../../Components/Admin/AddLevel';

function LearningPath() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js";
    script.async = true;
    script.onload = () => {
      if (!effectRef.current && window.VANTA) {
        effectRef.current = window.VANTA.NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x2139c7,
          backgroundColor: 0x181822,
          points: 13.0,
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (effectRef.current) effectRef.current.destroy();
    };
  }, []);

  function onAdd() {
    window.location.reload();
  }

  return (
    <div ref={vantaRef} className='learning-path-bg'>
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
