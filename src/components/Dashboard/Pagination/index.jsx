import React from 'react'

export default function Pagination({ total, limit, skip, onChange }) {

    const isNext = total > skip
    const isPrev = skip > 0
    const current = limit + skip

    const onLimit = e => {
        const val = e.target.value
        onChange({ limit: parseInt(val) })
    }

    const onPrev = () => {
        onChange({ skip: limit - skip })
    }


    const onNext = () => {
        onChange({ skip: current })
    }


    return (
        <div className='pagination-container'>
            <div>Limit</div>
            <select value={limit} onChange={onLimit}>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
            <button onClick={onPrev} disabled={!isPrev} style={{ padding: '0 4px' }}>Perv</button>
            {current}/{total}
            <button onClick={onNext} disabled={!isNext} style={{ padding: '0 4px' }}>Next</button>
        </div>
    )
}
