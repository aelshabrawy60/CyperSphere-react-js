import React from 'react'
import Company from '../Company/Company'
import companiesData from '../../../data/egyptianCyberCompanies.json'

const companies = companiesData.companies

function CompaniesViewer() {
  return (
    <div className='bg-[#1D1D1F] rounded-[10px] p-3'>
        <div className='px-1 mb-2 flex flex-col md:flex-row gap-4 md:items-center md:justify-between'>
            <h5 className='font-bold'>Companies</h5>
        </div>
        <div className='flex flex-col gap-3 overflow-y-auto scrollbar-hide'>
            {companies.map((company, index) => (
                <Company key={index} {...company} />
            ))}
        </div>
    </div>
  )
}

export default CompaniesViewer
