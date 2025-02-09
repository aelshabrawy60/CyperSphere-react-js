import React from 'react'

function FilterBar({filters, setFilter, choosedFilter}) {
  return (
    <div className="flex space-x-4">
      {filters.map((filter, index) => (
        <button
          key={index}
          onClick={() => setFilter(index)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 
            ${index === choosedFilter
              ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
