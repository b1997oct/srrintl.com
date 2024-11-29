import './readme.scss'

export default function Readme() {
    return (
        <div className='main readme'>
            <h1 style={{ color: '#98f' }} className='tac'>Book Donation App</h1>
            <br />
            <br />
            <p>Packages</p>
            <ol>
                <li>React with Vitejs (client side)</li>
                <li>React Router Dom (for Routing)</li>
                <li>Moment (for date formate)</li>
                <li>XLSX For Exporting Data to XL Sheet or Google Sheet</li>
                <li>Express (Node js Server)</li>
                <li>Mongoose (Schema & DB Connection)</li>
                <li>MongoDb (Storage & Db Query)</li>
                <li>Deployment render.com & vercel</li>
            </ol>

            <div className='wrapper'>
                <div className='cointer'>
                    <h3>Add, Modify Book Data</h3>
                    <img src='/book-manage.png' alt='books edit' />
                </div>
                <div className='cointer'>
                    <h3>Books Table, Pagination, Filters</h3>
                    <img src='/table.png' alt='table' />
                </div>
                <div className='cointer'>
                    <h3>Data Export to JSON or XL </h3>
                    <img src='/export.png' alt='export' />
                </div>
            </div>
            <br />
            <br />

            <h2 className='tac'>Login & Signup Pages Fully Error Validation in Frontend & Backend</h2>
            <br />
            <div className='wrapper'>
                <div className='cointer'>
                    <h3>Landing Page Cards Show Login/Not Login</h3>
                    <img src='/landing-page.png' alt='table' />
                </div>
                <div className='cointer'>
                    <h3>Login Page</h3>
                    <img src='/login.png' alt='login' />
                </div>

                <div className='cointer'>
                    <h3>Signup Page</h3>
                    <img src='/signup.png' alt='signup' />
                </div>
            </div>
            <br />
            <br />
            <h2 className='tac'>Responsive View</h2>
            <div className='wrapper'>
                <div className='cointer'>
                    <h3>Mobile View</h3>
                    <img src='/mobile.png' alt='mobile' />
                </div>
                <div className='cointer'>
                    <h3>Tablet View</h3>
                    <img src='/tablet.png' alt='mobile' />
                </div>
                <div className='cointer'>
                    <h3>Laptop View</h3>
                    <img src='/laptop.png' alt='mobile' />
                </div>
            </div>
        </div>
    )
}
