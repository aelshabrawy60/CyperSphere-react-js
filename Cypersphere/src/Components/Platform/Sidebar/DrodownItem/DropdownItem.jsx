import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function DropdownItem({navs , open}) {
  return (
    <div style={{display: open ? 'block' : 'none'}} className='ps-3'>
        <nav className="nav-menu">
          {navs.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item nav-small ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </Link>
          ))}
        </nav>
    </div>
  )
}

export default DropdownItem