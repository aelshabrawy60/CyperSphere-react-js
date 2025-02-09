import { IoLocation } from "react-icons/io5";
import { FaClock } from "react-icons/fa";

function Job({title, description, jobLogo, location, agoTime, link = "#"}) {

  // Limit the description to 100 characters (or any desired length)
  const maxDescriptionLength = 100;
  const truncatedDescription = description.length > maxDescriptionLength
    ? description.substring(0, maxDescriptionLength) + "..."
    : description;

  return (
    <div className='flex flex-col md:flex-row gap-4 p-3 md:items-center md:justify-between rounded-lg bg-gradient-to-r from-[#242424] to-[#202832]'>
        <div className='flex flex-col md:flex-row gap-4 md:items-center'>
          <div className='min-w-[100px] min-h-[100px] w-[100px] h-[100px] overflow-hidden'>
              <img src={jobLogo || 'job.jpg'} className='w-full h-full object-cover rounded'></img>
          </div>
          <div>
              <div className='font-bold mb-2'>{title}</div>
              <div className='text-[13px] text-opacity-63 text-white mb-2 max-w-[600px] overflow-hidden text-ellipsis'>{truncatedDescription}</div>
              <div className='flex gap-2'>
                <div className='text-[13px] flex items-center gap-2'><IoLocation /> {location}</div>
                {agoTime ? <div className='text-[13px] flex items-center gap-2'><FaClock /> {agoTime}</div> : null}
              </div>
          </div>
        </div>
        <div>
            {console.log(link)}
            <a href={link} target='_blank' className='block text-center w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors'>Apply</a>
        </div>
    </div>
  )
}

export default Job
