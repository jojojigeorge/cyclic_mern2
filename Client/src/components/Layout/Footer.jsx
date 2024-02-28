import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <h6 className='text-center'>All Rights Reserved &copy; jojigeorge</h6>
        <p className='text-center mt-3 text-black'>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </p>
    </div>
  )
}

export default Footer