import React, { useState } from 'react'
import ClickAwayListener from '../../ClickAwayListener'

export default function Table({ labels, data, skip, sortKey, sortOrder, onChange }) {

    return (
        <div key={skip} className='table-container'>
            <table>
                <tbody>
                    <tr className='thead'>
                        {labels && labels.map((name, index) => (
                            <Th key={index} name={name} onChange={onChange} sortKey={sortKey} sortOrder={sortOrder} />
                        ))}
                    </tr>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex + skip}>
                            {Object.values(row).map((value, colIndex) => (
                                <td key={colIndex}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


function Dots() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="5" r="2"></circle>
        <circle cx="12" cy="12" r="2"></circle>
        <circle cx="12" cy="19" r="2"></circle>
    </svg>
}

const Th = ({ name, sortOrder, sortKey, onChange }) => {

    const [open, setOpen] = useState(false)

    const handleChange = (order) => {
        onChange({ sortKey: name, sortOrder: order })
        setOpen(false)
    }

    const active = name == sortKey
    const order = active && sortOrder

    return <td className='th' >
        <div>
            <span>{name}</span>
            <div className='sort'>
                <button className={active && 'is-sort'} onClick={() => setOpen(true)}><Dots /></button>
                {open &&
                    <ClickAwayListener onClickAway={() => setOpen(false)} className='popper'>
                        <button className={order == undefined && 'active'} onClick={() => handleChange(0)}>none</button>
                        <button className={order == 1 && 'active'} onClick={() => handleChange(1)}>Asc</button>
                        <button className={order == -1 && 'active'} onClick={() => handleChange(-1)}>Dsc</button>
                    </ClickAwayListener>}
            </div>
        </div>
    </td>
}