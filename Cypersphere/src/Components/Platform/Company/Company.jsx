import React from 'react'
import './Company.css'
import { SlArrowRight } from "react-icons/sl";
import { IoLocation } from "react-icons/io5";


function Company({logo, name, location, link = "#"}) {
  return (
    <div className='company-container d-flex flex-column flex-md-row gap-4 p-3 align-items-md-center justify-content-md-between'>
        <div className='d-flex gap-3 align-items-center'>
            <div className='company-logo-container'>
                <img src={logo}></img>
            </div>
            <div className='company-info-container'>
                <div className='copany-name mb-2 fw-bold'>{name}</div>
                <div className='company-details'>
                    <div className='company-location d-flex align-items-center gap-1'><IoLocation />{location}</div>
                </div>
            </div>
        </div>
        <div>
            <a href={link} className='right-arrow-btn'>
                <SlArrowRight className='fs-4'/>
            </a>
        </div>
    </div>
  )
}

export default Company