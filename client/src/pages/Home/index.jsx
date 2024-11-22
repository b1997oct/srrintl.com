import React, { useState } from 'react'
import './home.scss'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import AllBooks from './AllBooks'

export default function Home() {

  const [login, setLogin] = useState()


  return (
    <div>
      <Navbar onLogin={setLogin} />
      <br />
      <div className='heading'>
        <h1>Share the Joy of Reading</h1>
        <p>Donate your books and make a diffrence in someone's life.</p>
      </div>
      {!login &&
        <div className='action-buttons'>
          <Link to='/login'><button className='primary'>Login</button></Link>
          <Link to='/signup'><button className='outlined'>Signup</button></Link>
        </div>}

        <AllBooks />
      <div className='content'>
        <div className='section'>
          <h2>Why Donate?</h2>
          <ol>
            <li>Help others read</li>
            <li>Reuse books</li>
            <li>Support those in need</li>
            <li>Free up space</li>
          </ol>
        </div>
        <div className='section'>
          <h2>How It Works</h2>
          <ol>
            <li>Sign up</li>
            <li>List books</li>
            <li>Connect</li>
            <li>Share books</li>
          </ol>
        </div>
        <div className='span-full section'>
          <h2>Join Out Community</h2>
          <p>Stay updated with our latest events and book donations</p>
          <div className='subcribe'>
            <input placeholder='Enter your Email' />
            <button className='primary'>Subcribe</button>
          </div>
        </div>
      </div>
    </div>
  )
}
