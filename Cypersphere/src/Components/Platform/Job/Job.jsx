import './Job.css'
import { IoLocation } from "react-icons/io5";
import { FaClock } from "react-icons/fa";


function Job({title, description, jobLogo, location, agoTime, link = "#"}) {

  // Limit the description to 100 characters (or any desired length)
  const maxDescriptionLength = 100;
  const truncatedDescription = description.length > maxDescriptionLength
    ? description.substring(0, maxDescriptionLength) + "..."
    : description;

  return (
    <div className='job-container d-flex flex-column flex-md-row gap-4 p-3 align-items-md-center justify-content-md-between'>
        <div className='d-flex gap-4 flex-column flex-md-row align-items-md-center'>
          <div className='job-img-container'>
              <img src={jobLogo || 'job.jpg'}></img>
          </div>
          <div>
              <div className='fw-bold mb-2'>{title}</div>
              <div className='job-description mb-2'>{truncatedDescription}</div>
              <div className='d-flex gap-2'>
                <div className='job-location d-flex align-items-center gap-2'><IoLocation /> {location}</div>
                {agoTime ? <div className='job-location d-flex align-items-center gap-2'><FaClock />    {agoTime}</div> : null}
                
              </div>
          </div>
        </div>
        <div>
            {console.log(link)}
            <a href={link} target='_blank' className='main-btn apply-btn d-block text-center'>Apply</a>
        </div>
    </div>
  )
}

export default Job