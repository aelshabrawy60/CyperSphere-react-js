import React, { useEffect, useState } from 'react';

function WebCourse() {

    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
    fetch('/web.html') // public folder
        .then((res) => res.text())
        .then((data) => setHtmlContent(data));
    }, []);
  return (
        <div className='w-full overflow-hidden'>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
  )
}

export default WebCourse