import React from 'react'
import AddLevel from '../../Components/Admin/AddLevel'
import Levels from '../../Components/Platform/Levels/Levels'
import AddCourse from '../../Components/Admin/AddCourse'
import AddLesson from '../../Components/Admin/AddLesson'

function AdminHome() {
  return (
    <div>
        <Levels/>
        <AddCourse levelId={8}/>
        <AddLesson courseId={1}/>
    </div>
  )
}

export default AdminHome