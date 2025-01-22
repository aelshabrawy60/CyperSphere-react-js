import React from 'react'
import './CompaniesViewer.css'
import Company from '../Company/Company'

const companies = [
    {
        name: "google",
        location: "Cairo, Egypt",
        logo: "https://pngimg.com/d/google_PNG19635.png",
        link: ""
    },
    {
        name: "google",
        location: "Cairo, Egypt",
        logo: "https://pngimg.com/d/google_PNG19635.png",
        link: ""
    },
    {
        name: "google",
        location: "Cairo, Egypt",
        logo: "https://pngimg.com/d/google_PNG19635.png",
        link: ""
    },
    {
        name: "google",
        location: "Cairo, Egypt",
        logo: "https://pngimg.com/d/google_PNG19635.png",
        link: ""
    },
    {
        name: "google",
        location: "Cairo, Egypt",
        logo: "https://pngimg.com/d/google_PNG19635.png",
        link: ""
    },
    {
        name: "google",
        location: "Cairo, Egypt",
        logo: "https://pngimg.com/d/google_PNG19635.png",
        link: ""
    },
]

function CompaniesViewer() {
  return (
    <div className='companies-viewer-container p-3'>
        <div className='companies-viewer-header px-1 mb-2 d-flex flex-column flex-md-row gap-4 align-items-md-center justify-content-md-between'>
            <h5 className='companies-viewer-header--title fw-bold'>Companies</h5>
        </div>
        <div className='d-flex flex-column gap-3 viewer-container'>
            {companies.map((company, index) => (
                <Company key={index} {...company} />
            ))}
        </div>
    </div>
  )
}

export default CompaniesViewer