import React, { useEffect } from 'react'
import CourseCard from '../CourseCard/CourseCard'

function Courses({data}) {

  useEffect(()=>{
    console.log("data", data)
  }, [])
  return (
    <div>
        {data.map((course)=>{
            return <CourseCard key={course.id} data={course}/>
        })}
    </div>
  )
}

export default Courses