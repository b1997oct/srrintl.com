import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'
import './form.scss'
import useError from '../../components/useError'
import axios from 'axios'
import Cookies from 'js-cookie'



const schema = [
    {
        label: 'Name',
        name: 'name',
        placeholder: 'John Doe',
        error: { required: true, max: 100 }
    },
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




export default function Signup() {

    const { data, inputParse, isError, setData } = useError(schema),
        [error, setError] = useState(''),
        [touched, setTouched] = useState(false),
        [loading, setLoading] = useState(false),
        url = new URL(location.href),
        account = url.searchParams.get('account'),
        token = url.searchParams.get('token')

    function getUser() {
        axios.get('/user/account')
            .then(res => {
                const { name, email } = res.data
                setData({ name, email })
            })
            .catch(err => {
                alert(err.response?.data.message || err.message)
            })
    }
    useEffect(() => {
        document.title = 'Signup | ' + document.title

        if (account == 'edit') {
            if (token) {
                getUser()
            } else {
                url.searchParams.append('token', Cookies.get('token'))
                location.replace(url.toString())
            }
        }
    }, [])

    async function submit(e) {
        e.preventDefault()
        if (isError()) {
            setTouched(true)
            return
        }
        setLoading(true)
        setError('')
        try {

            data.token = token
            const { data: res } = await axios.post('/signup', data)
            Cookies.set('token', res.token)
            location.href = '/'
        } catch (err) {
            console.log('err: ', err);
            setError(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='container'>
            <form onSubmit={submit} className='border p-4 grid gap-4 rounded-xl md:p-8 shadow'>
                <h1 className='tac'>Sign Up</h1>
                <p className='tac'>Create an account to access the Book Donation Synstem</p>
                {schema.map(d => <Input key={d.name} disabled={loading} touched={touched} {...inputParse(d)} />)}
                <div className='text-error'>{error}</div>
                <button disabled={loading} type='submit' className='primary'>Sign Up</button>
                <div className='footer'>Already Have An Account? <Link className='hover:underline' to={'/login'}>Log In</Link></div>
            </form>
        </div>
    )
}


