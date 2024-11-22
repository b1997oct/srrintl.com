import React, { useState } from 'react'
import Input from '../../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import '../Signup/form.scss'
import useError from '../../components/useError'
import axios from 'axios'
import Cookies from 'js-cookie'

const schema = [
    {
        label: 'Email',
        name: 'email',
        placeholder: 'john@example.com',
        error: { required: true, max: 100 }

    },
    {
        label: 'Password',
        name: 'password',
        error: { required: true, min: 4, max: 16 }
    }
]


export default function Login() {

    const { data, inputParse, isError } = useError(schema),
        [error, setError] = useState(''),
        [touched, setTouched] = useState(false),
        [loading, setLoading] = useState(false),
        navigate = useNavigate()


   async function submit(e) {
        e.preventDefault()
        if (isError()) {
            setTouched(true)
            return
        }
        setLoading(true)
        setError('')
        try {
        const { data: res } = await axios.post('/login', data)
        Cookies.set('token', res.token)
        location.href ='/'
        } catch (err) {
            setError(err.response.data.message)
        } finally {
            setLoading(false)
        } 
    }

    return (
        <div  className='container'>
            <form onSubmit={submit} className='border p-4 grid gap-4 rounded-xl md:p-8 shadow'>
                <h1 className='tac'>Login</h1>
                <p className='tac'>Enter email and password to access the Book Donation Synstem</p>
                {schema.map(d => <Input key={d.name} touched={touched} {...inputParse(d)} />)}
                <div className='text-error'>{error}</div>
                <button type='submit' className='primary'>Login</button>
                <div className='footer'>Don't Have An Account? <Link className='hover:underline' to={'/signup'}>Sign Up</Link></div>
            </form>
        </div>
    )
}


