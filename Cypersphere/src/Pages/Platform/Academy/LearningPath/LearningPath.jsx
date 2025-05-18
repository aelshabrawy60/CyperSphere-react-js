import React from 'react'

import './LearningPath.css'
import Levels from '../../../../Components/Platform/Levels/Levels'
import AddLevel from '../../../../Components/Admin/AddLevel'

function LearningPath() {

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  function onAdd(){
    window.location.reload()
  }
  return (
    <div className='p-4'>
      {isAdmin? <div className='mb-3'>
        <AddLevel onAdd={onAdd}/>
      </div>: null}
      
      <Levels/>
    </div>
  )
}

export default LearningPath