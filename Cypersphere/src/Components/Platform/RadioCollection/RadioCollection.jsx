import React from 'react'
import './RadioCollection.css'

function RadioCollection({radios, selectedRadio, setSelectedRadio}) {
  return (
    <div className='radio-collection-container d-flex flex-wrap gap-3'>
        {radios.map((radio, index) => (<div key={index} className={`radio-tab ${index === selectedRadio ? 'active' : ''}`} onClick={() => setSelectedRadio(index)}>{radio}</div>))}
    </div>
  )
}

export default RadioCollection