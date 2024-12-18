import React from 'react'

export default function Search({ filters, onChange }) {

    const labels = Object.keys(filters).map(d => {
        const { datatype, searchType } = filters[d]
        if (datatype != 'boolean' && searchType == 'includes') {
            return d
        }
    }).filter(d => d)


    const handleChange = e => {
        const { id, value } = e.target
        onChange({ name: id, value })
    }

    return (
        <div>
            <div style={{ padding: "0 16px" }}>Search</div>
            <div className='search-container'>
                {labels.slice(0, 5).map(d => <div className='search-ele'>
                    <label htmlFor={d}>{d}</label>
                    <input id={d} value={filters[d]?.value} placeholder={'Search'} onChange={handleChange} />
                </div>
                )}
            </div>
        </div>
    )
}
