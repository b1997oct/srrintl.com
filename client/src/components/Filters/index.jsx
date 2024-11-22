import React, { useState } from 'react'

const filters = [
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
]
export default function useFilters(initial) {
    
    const [fils, setFils] = useState({
        limit: 24,
        skip: 0
    })
    
    function onChange(e) {
        const { value, name } = e.target
        setFils({ ...fils, [name]: value })
    }

     const filtersUi = (
        <div className='filters'>
            {filters.map(d =>
                <input name={d.name} onChange={onChange} value={fils[d.name] || ''} placeholder={d.label} />
            )}
            <button onClick={() => setFils({})}>Reset</button>
        </div>
    )

    return { fils, filtersUi, setFils }
}
