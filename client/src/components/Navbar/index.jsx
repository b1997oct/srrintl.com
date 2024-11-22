import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import ClickAwayListener from '../ClickAwayListener'


export default function Navbar({ onLogin }) {

    const [user, setUser] = useState(false),
        { name } = user || {}

    async function getUser() {

        try {
            const { data } = await axios.get('/user')
            setUser(data)
            onLogin(data)
        } catch (error) {
            console.log('please login');
        }
    }


    useEffect(() => {
        getUser()
    }, [])


    return (
        <div className='navbar'>
            <h2><a href='/'>BookShare</a></h2>
            {!name ? <>
                <Link to='/login'>Login</Link>
                <Link to='/signup'><button className='primary'>Signup</button></Link>
            </> :
                <>
                    <UserName>{name}</UserName>
                    <Link to='/books'><button style={{ padding: "0.5rem" }} className='primary'>Dashboard</button></Link>
                </>}
        </div>
    )
}

function UserName({ children }) {

    const [open, setOpen] = useState(false)

    function logout() {
        axios.post('/user/logout')
        .then(res=>{
            Cookies.remove('token')
            location.reload()
        })
        .catch(err=>{
            alert(err.message || err.respose.data.message)
        })
       
    }

    return <div onClick={() => setOpen(true)} className='truncate pointer option'>
        {children}
        <svg width="24"
            height="24"
            viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        {open && <ClickAwayListener className={'options'} onClickAway={() => setOpen(false)}>
            <Link to={'/signup?account=edit'} className='option'>Account</Link>
            <div onClick={logout} className='option'>Logout</div>
        </ClickAwayListener>}
    </div>
}