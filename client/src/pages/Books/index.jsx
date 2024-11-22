import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import './books.scss'
import axios from 'axios'
import ManageBook from './ManageBook'
import useFilters from '../../components/Filters'
import usePagination from '../../components/usePagination'

const columns = [
    {
        name: "sno",
        label: "S. No"
    },
    {
        name: "title",
        label: "Title"
    },
    {
        name: "author",
        label: "Author"
    },
    {
        name: "genre",
        label: "Genre"
    },
    {
        name: "yop",
        label: "Year of Publication"
    },
    {
        name: "isbn",
        label: "ISBN"
    },
    {
        label: "Image"
    },
    {
        label: "Action"
    }
]


export default function Books() {

    const { fils, filtersUi } = useFilters(),
        [data, setData] = useState([]),
        [loading, setLoading] = useState([]),
        [error, setError] = useState(''),
        [open, setOpen] = useState(null),
        id = open?._id,
        totalRef = useRef(0),
        total = totalRef.current,
        { skip, limit } = fils,
        { currentPage, nextPage, prevPage, totalPages } = usePagination({ limit, skip, total })


    useEffect(() => {
        setLoading(true)
        axios.post('/user/books', fils)
            .then(res => {
                totalRef.current = res.data.total || 0
                setData(res.data.data)
                setError('')
            })
            .catch(err => {
                console.log('err: ', err);
                setError(err.message)
                if (err.response.data.href) {
                    location.href = '/'
                }
            })
            .finally(() => setLoading(false))
    }, [fils])



    async function onDelete(val) {

        if (!confirm('confirm delete')) return
        try {
            await axios.delete('/user/book', { id: val })
            const f = data.filter(d => d._id != val)
            setData(f)
        } catch (err) {
            alert(err.respose?.data.message || err.message)
        }
    }



    function onClose(res) {
        if (res) {
            if (id == 'new') {
                data.push(res)
            } else {
                data.map(d => {
                    if (id == d._id) {
                        Object.assign(d, res)
                    }
                })
            }
            setData([...data])
        }
        setOpen(null)
    }


    return (
        <div>
            <Navbar />
            <div className='main-container'>
                <div style={{ marginBottom: 20 }} className='group'>
                    <div className='text-error'>{error}</div>
                    <button className='primary' onClick={() => setOpen({ _id: 'new' })}>+ Add New</button>
                </div>
                <ManageBook open={open} onClose={onClose} id={id} />
                {filtersUi}
                <div className='table-container'>
                    <div>{total.current} Results Found</div>
                    <br />

                    <table>
                        <thead>
                            <tr>
                                {columns.map(d => <th key={d.name}>{d.label}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(d => {
                                let { sno, title, author, genre, yop, isbn, image, _id } = d
                                return <tr key={_id}>
                                    <td>{sno}</td>
                                    <td>{title}</td>
                                    <td>{author}</td>
                                    <td>{genre}</td>
                                    <td>{yop}</td>
                                    <td>{isbn}</td>
                                    <td><div className='img'>
                                        {image ?
                                            <img style={{ width: 50 }} className='cover' src={image} alt={title} />
                                            : <div>Not Upload</div>}
                                    </div>
                                    </td>
                                    <td>
                                        <div className='action'>
                                            <button onClick={() => setOpen(d)}>Edit</button>
                                            <button onClick={() => onDelete(_id)} >Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            })}
                            {loading && Array.from({ length: 4 }).map((d, i) => <tr key={i}>{columns.map(da => <td><div className='skt' /></td>)}</tr>)}
                        </tbody>
                    </table>
                    <div className='group'>
                        <div>Page No. {currentPage}/{totalPages}</div>
                        <button disabled={!prevPage}>Prev</button>
                        <div>Records {total}</div>
                        <button disabled={!nextPage}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
