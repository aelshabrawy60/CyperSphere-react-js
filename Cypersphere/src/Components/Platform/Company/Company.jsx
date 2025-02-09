import React from 'react'
import { FaLinkedin, FaFacebook, FaTwitter, FaGlobe } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";

function Company({logo, name, location, socialLinks}) {
  return (
    <div className='bg-[#242424] rounded-lg flex flex-col md:flex-row gap-4 p-3 md:items-center md:justify-between'>
        <div className='flex gap-3 items-center'>
            <div className='bg-[#363636] p-2 rounded-md'>
                <img src={logo} alt={name} className='w-10 h-10 object-cover'></img>
            </div>
            <div>
                <div className='mb-2 font-bold'>{name}</div>
                <div className='text-xs text-white/60'>
                    <div className='flex items-center gap-1'><IoLocation />{location}</div>
                </div>
            </div>
        </div>
        <div className='flex gap-3'>
            {socialLinks?.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className='text-white hover:text-blue-500'>
                    <FaLinkedin className='text-xl'/>
                </a>
            )}
            {socialLinks?.facebook && (
                <a href={typeof socialLinks.facebook === 'string' ? socialLinks.facebook : socialLinks.facebook[0]} 
                   target="_blank" rel="noopener noreferrer" 
                   className='text-white hover:text-blue-600'>
                    <FaFacebook className='text-xl'/>
                </a>
            )}
            {socialLinks?.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className='text-white hover:text-blue-400'>
                    <FaTwitter className='text-xl'/>
                </a>
            )}
            {socialLinks?.website && (
                <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className='text-white hover:text-gray-400'>
                    <FaGlobe className='text-xl'/>
                </a>
            )}
        </div>
    </div>
  )
}

export default Company
