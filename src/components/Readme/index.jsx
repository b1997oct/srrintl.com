import React from 'react'
import './readme.css'

export default function Readme() {
    return (
        <div className='readme-container'>
            <h1 className='text-secondary'>Assignment Summary: Building a React App for Uploading and Visualizing Excel and CSV Files</h1>

            <h1 className='text-primary'>Overview</h1>
            <div className='section-container'>
                <div className='section'>
                    <h3>1.1 Landing Page</h3>
                    <img src='/1st.png' />
                </div>

                <div className='section'>
                    <h3>1.2 After File Load</h3>
                    <img src='/2nd.png' />
                </div>

                <div className='section'>
                    <h3>1.3 Search Feature</h3>
                    <img src='/3rd.png' />
                </div>

                <div className='section'>
                    <h3>1.4 Filters Modal</h3>
                    <img src='/4th.png' />
                </div>

                <div className='section'>
                    <h3>1.5 Sort Popper</h3>
                    <img src='/5th.png' />
                </div>

                <div className='section'>
                    <h3>1.6 Sort Field Active</h3>
                    <img src='/6th.png' />
                </div>

                <div className='section'>
                    <h3>Table With Pagination</h3>
                    <img src='/7th.png' />
                </div>

            </div>
        </div>
    )
}
