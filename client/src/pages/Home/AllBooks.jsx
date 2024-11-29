import React, { useEffect, useRef, useState } from 'react'
import BookCards from './BookCards'
import useFilters from '../../components/Filters'
import axios from 'axios'
import usePagination from '../../components/usePagination'

export default function AllBooks() {

    const { fils, filtersUi } = useFilters(),
        [data, setData] = useState([]),
        [loading, setLoading] = useState([]),
        [error, setError] = useState(''),
        totalRef = useRef(0),
        total = totalRef.current,
        { skip, limit } = fils,
        { currentPage, nextPage, prevPage, totalPages } = usePagination({ limit, skip, total })

    useEffect(() => {
        setLoading(true)
        axios.post('/books', fils)
            .then(res => {
                totalRef.current = res.data.total || 0
                setData(res.data.data)
                setError('')
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }, [fils])

    return (
        <div className='books-cointer'>
            {filtersUi}
            <BookCards data={data} loading={loading} />
            <div className='group'>
                <div>Records {total}</div>
                <button disabled={!prevPage}>Prev</button>
                <div>Page {currentPage}/{totalPages}</div>
                <button disabled={!nextPage}>Next</button>
            </div>
        </div>
    )
}
