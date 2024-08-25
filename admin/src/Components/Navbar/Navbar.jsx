import React from 'react'
import './Navbar.css'
import profile from '../../assets/boy3.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <h1 className='nav-logo'>Ready</h1>
      <img src={profile} alt="" className='nav-profile' />


    </div>
  )
}

export default Navbar