import React from 'react'

import { Link } from 'react-router-dom'
import './LandingPage.css'
import Sidebar from '../../Components/Platform/Sidebar/Sidebar'

function LandingPage() {
  return (
    <div>
      <Link to="signin">Signin</Link>
    </div>
  )
}

export default LandingPage