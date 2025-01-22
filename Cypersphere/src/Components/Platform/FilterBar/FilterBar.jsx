import React from 'react'
import './FilterBar.css'

function FilterBar({filters, setFilter, choosedFilter}) {
  return (
    <div className='filter-bar-container d-flex flex-wrap gap-3'>
        {filters.map((filter, index) => (<div onClick={() => setFilter(index)} className={`filter-tab ${index === choosedFilter ? 'active' : ''}`} key={index}>{filter}</div>))}
    </div>
  )
}

export default FilterBar