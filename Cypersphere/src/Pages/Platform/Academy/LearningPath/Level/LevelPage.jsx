import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Courses from '../../../../../Components/Platform/Courses/Courses';
import Levels from '../../../../../Components/Platform/Levels/Levels'; // adjust path as needed
import AddLevel from '../../../../../Components/Admin/AddLevel';
import AddCourse from '../../../../../Components/Admin/AddCourse';
import BackgroundParticles from '../../../../../Components/Platform/BackgroundParticles/BackgroundParticles';

function LevelPage() {
  const { id } = useParams();
  const [levelData, setLevelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    async function fetchLevel() {
      setLoading(true);
      try {
        const response = await fetch(`https://cybersphere7.runasp.net/api/Level/get-level-by-id?id=${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setLevelData(data);
      } catch (error) {
        console.error('Failed to fetch level data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchLevel();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  function onAdd(){
    window.location.reload()
  }

  if (!levelData) {
    return <div className="text-center text-red-500">Failed to load level data.</div>;
  }

  const hasSubLevels = Array.isArray(levelData.subLevels) && levelData.subLevels.length > 0;

  return (
    <div className="p-4">
      <BackgroundParticles/>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className='flex gap-2 mb-4'>
          {isAdmin? <><AddLevel ParentId={levelData.id} onAdd={onAdd}/>
          <AddCourse levelId={levelData.id}/></>: null}
          
        </div>

        <h1 className="text-2xl font-bold mb-2">{levelData.title}</h1>
        <p className="mb-4 text-gray-400">{levelData.description}</p>


        {hasSubLevels ? (
          <Levels initialLevels={levelData.subLevels} />
        ) : (
          <Courses data={levelData.courses} />
        )}
      </div>
    </div>
  );
}

export default LevelPage;
