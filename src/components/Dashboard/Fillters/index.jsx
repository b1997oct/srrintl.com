import React, { useState } from 'react'
import ClickAwayListener from '../../ClickAwayListener'

export default function Filters({ filters, labels, total, onChange }) {

    const [open, setOpen] = useState(false)

    const handleChange = ({ name, value }) => {
        onChange({ ...filters, [name]: value })
    }

    const onSubmit = () => {
        setOpen(false)
    }

    return (
        <div className='upload-buttons-group'>
            <button onClick={() => setOpen(true)} className='filter-btn'>Filters</button>
            {open &&
                <div className='modal'>
                    <ClickAwayListener onClickAway={() => setOpen(false)} className='modal-content'>
                        <div className='grid'>
                            <div>Name</div>
                            <div>Type</div>
                            <div className='span-rows'>Search Type & Value</div>
                        </div>
                        <div className='filter-content-container'>
                            {labels && labels.map(d => <FiltersTypes key={d} name={d} value={filters[d]} onChange={handleChange} />)}
                        </div>
                        <div className='upload-buttons-group'>
                            <button onClick={onSubmit} className='filter-btn'>Apply ({total})</button>
                        </div>
                    </ClickAwayListener>
                </div>}
        </div>
    )
}


function FiltersTypes({ name, value, onChange }) {

    const { datatype, searchType, value: val } = value || {}

    const handleDataType = (e) => {
        const f = e.target.value
        const f2 = value || {}
        if (f == 'string') {
            f2.searchType = 'includes'
        } else if (f == 'number') {
            f2.searchType = 'min'
        }
        value.datatype = f
        onChange({ name, value })
    }

    const handleSearchType = (e) => {
        const f = e.target.value
        if (!value) {
            value = {}
        }
        value.searchType = f
        onChange({ name, value })
    }

    const onValueChange = (e) => {
        const f = e.target.value
        const f2 = value || {}
        f2.value = f
        onChange({ name, value: f2 })
    }


    return <div className='grid-content'>
        <div>{name}</div>
        <div>
            <select value={datatype} onChange={handleDataType}>
                <option value={'string'}>"string"</option>
                <option value={'number'}>"number"</option>
                <option value={'boolean'}>"boolean"</option>
            </select>
        </div>
        <div>
            {datatype == "string" ?
                <select style={{ minWidth: 100 }} value={searchType} onChange={handleSearchType}>
                    <option>includes</option>
                    <option>startswith</option>
                    <option>endswith</option>
                </select>
                : datatype == 'number' ?
                    <select style={{ minWidth: 100 }} value={searchType} onChange={handleSearchType}>
                        <option>min</option>
                        <option>max</option>
                        <option>equal</option>
                    </select>
                    : <select style={{ minWidth: 100 }} value={searchType} onChange={handleSearchType}>
                        <option>all</option>
                        <option value={0}>true</option>
                        <option value={1}>false</option>
                    </select>}
        </div>
        {datatype == 'boolean' ?
            <div style={{ width: 200 }}></div> :
            <div style={{ display: 'flex', alignItems: 'start', gap: 8, width: 200 }}>
                <input value={val} type={datatype == 'number' ? 'number' : 'text'} onChange={onValueChange} style={{ minWidth: 100 }} />
                {val && <button value={''} onClick={onValueChange}>reset</button>}
            </div>}
    </div>
}


export const filtersIt = {
    string: {
        startswith: (a = '', b = '') => {
            return a.toString().startsWith(b)
        },
        endswith: (a = '', b = '') => {
            return a.toString().endsWith(b)
        },
        includes: (a = '', b = '') => {
            return a.toString().includes(b)
        },
    },
    number: {
        min: (a, b) => {
            a = Number(a)
            b = Number(b)
            return a >= b
        },
        max: (a, b) => {
            a = Number(a)
            b = Number(b)
            return a <= b
        },
        equal: (a, b) => {
            a = Number(a)
            b = Number(b)
            return a == b
        },
    },
    boolean: (a, b) => {
        a = Boolean(a)
        b = Boolean(b)
        return a == b
    }
}

