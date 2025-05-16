import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function LessonPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to convert normal YouTube URL to embeddable URL for iframe
  function getEmbedUrl(url) {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
      // fallback to original url if no video id
      return url;
    } catch {
      return url;
    }
  }

  useEffect(() => {
    async function fetchLesson() {
      setLoading(true);
      try {
        const response = await fetch(`https://cybersphere7.runasp.net/api/Lesson/get-lesson_by-id?id=${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setLesson(data);
      } catch (error) {
        console.error('Failed to fetch lesson data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchLesson();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!lesson) {
    return <div className="text-center text-red-500">Failed to load lesson data.</div>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="w-full aspect-video">
        <iframe
          src={getEmbedUrl(lesson.videoURL)}
          title={lesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg shadow-lg"
        ></iframe>
      </div>
      <h1 className="text-3xl font-bold mb-4 mt-4">{lesson.title}</h1>
      <p className="mb-6 text-gray-400">{lesson.description}</p>
    </div>
  );
}

export default LessonPage;
