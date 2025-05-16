import React from 'react'
import LessonsCard from '../LessonsCard/LessonsCard'

function Lessons({data}) {

  return (
    <div>
        {data.map((lesson)=>{
            return <LessonsCard key={lesson.id} data={lesson}/>
        })}
    </div>
  )
}

export default Lessons