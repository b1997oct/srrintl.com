import React from 'react'
import './not-found.css'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='container'>
            <h1>404</h1>
            <p>
                Your Looking Page Not Found
            </p>
            <br />
            <Link to={'/'}>Go to Home</Link>
        </div>
    )
}
