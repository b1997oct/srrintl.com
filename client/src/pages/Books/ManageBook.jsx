import React, { useState } from 'react'
import Modal from '../../components/Modal'
import useError from '../../components/useError'
import axios from 'axios'
import Input from '../../components/Input'

const schema = [
    {
        name: "title",
        label: "Title",
        error: { required: true }

    },
    {
        name: "author",
        label: "Author",
        error: { required: true }

    },
    {
        name: "genre",
        label: "Genre",
        error: { required: true }

    },
    {
        name: "yop",
        label: "Year of Publication",
        error: { required: true }

    },
    {
        name: "isbn",
        label: "ISBN",
        error: { required: true }
    }
]


export default function ManageBook({ id, open, onClose }) {

    const [loading, setLoading] = useState(false),
        [error, setError] = useState(''),
        [touched, setTouched] = useState(false),
        { data, inputParse, isError, setData } = useError(schema, open),
        src = data.image || open?.image

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setData({ ...data, image: reader.result });
                console.log(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    async function submit() {

        if (isError()) {
            setTouched(true)
            return
        }
        setLoading(true)

        try {
            data.id = id
            const { data: res } = await axios.post('/user/book', data)
            onClose(res)
            setData({})
            setError('')
        } catch (err) {
            setError(err.response?.data.message || err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <div className='modal-header'>
                <div onClick={() => onClose()} className='close'>Close</div>
                <h3>{id == 'new' ? 'Add' : 'Edit'} Book</h3>
            </div>
            <div style={{ padding: 16 }}>
                <div>
                    <img style={{ width: 100 }} className='cover' src={src} />
                </div>
                <input type='file' disabled={loading} accept='image/*' onChange={handleFileChange} />
                {schema.map(d => <Input disabled={loading} key={d.name} touched={touched} {...inputParse(d)} />)}
                <div style={{ margin: '1rem 0' }} className='text-error'>{error}</div>
                <button disabled={loading} onClick={submit} className='primary'>SUBMIT</button>
            </div>
        </Modal>
    )
}
