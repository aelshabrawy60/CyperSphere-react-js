import React from 'react'
import AddLevel from '../../Components/Admin/AddLevel'
import Levels from '../../Components/Platform/Levels/Levels'
import AddCourse from '../../Components/Admin/AddCourse'
import AddLesson from '../../Components/Admin/AddLesson'
import StudentList from '../../Components/Admin/AlllStudents'
import QuizComponent from '../../Components/Platform/Quize/Quize'
import LatestArticle from '../../Components/Platform/LatestArticle/LatestArticle'

function AdminHome() {
  return (
    <div>
      <LatestArticle/>
    </div>
  )
}

export default AdminHome