import React from 'react'

import './LearningPath.css'
import Levels from '../../../../Components/Platform/Levels/Levels'
import AddLevel from '../../../../Components/Admin/AddLevel'

function LearningPath() {

  function onAdd(){
    window.location.reload()
  }
  return (
    <div className='p-4'>
      <div className='mb-3'>
        <AddLevel onAdd={onAdd}/>
      </div>
      <Levels/>
    </div>
  )
}

export default LearningPath