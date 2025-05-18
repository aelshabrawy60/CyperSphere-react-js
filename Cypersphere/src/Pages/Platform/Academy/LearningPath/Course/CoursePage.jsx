import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Lessons from '../../../../../Components/Platform/Lessons/Lessons';
import AddLesson from '../../../../../Components/Admin/AddLesson';
import QuizComponent from '../../../../../Components/Platform/Quize/Quize';

function CoursePage() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const studentId = localStorage.getItem('studentId');
  useEffect(() => {
    async function fetchCourse() {
      setLoading(true);
      try {
        const response = await fetch(`https://cybersphere7.runasp.net/api/Course/get-course?id=${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Failed to fetch course data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!courseData) {
    return <div className="text-center text-red-500">Failed to load course data.</div>;
  }

  return (
    <div className="p-4">
      <div className='mb-4'>
        {isAdmin? <AddLesson courseId={courseData.id}/>: null }
      </div>
      <h1 className="text-2xl font-bold mb-2">{courseData.title}</h1>
      <p className="mb-4 text-gray-400">{courseData.description}</p>
      <Lessons data={courseData.lessons || []} />
      <QuizComponent title={courseData.title} description={courseData.description} lessons={courseData.lessons} courseId={courseData.id} studentId={studentId}/>
    </div>
  );
}

export default CoursePage;
