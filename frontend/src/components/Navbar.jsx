import React from 'react'
import '../styles/Navbar.css'

export default function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbar_logo_container'>
        <img src={require("../images/walmart_logo.png")} className='navbar_logo'/>
      </div>
    </div>
  )
}
