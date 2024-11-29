import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { utils, writeFile } from 'xlsx'
import Modal from '../../components/Modal'


export default function ExportData({ data = [] }) {

    const [exportData, setExport] = useState(null),
        [dis, setDis] = useState(true)

    const onClick = () => {
        const ele = document.querySelector('[data-user]')
        const user = JSON.parse(ele.dataset.user)
        delete user._id
        delete user.__v
        delete user.createdAt
        delete user.updatedAt

        data.map(d => {
            delete d.image
            delete d.__v
        })
        user.phone = user.phone || "NA"
        user.books = data
        setExport(user)
    }

    useEffect(() => {
        const t = setTimeout(() => {
            setDis(false)
        }, 3000)

        return () => clearTimeout(t)
    }, [])

    return (
        <div>
            <button disabled={dis} onClick={onClick}>ExportData</button>
            <Modal open={Boolean(exportData)} onClose={() => setExport(null)}>
                <div style={{ background: "#0001", margin: 10, padding: 10 }}>
                    {JSON.stringify(exportData)}
                </div>
                <div style={{ display: 'flex', gap: 10, padding: 10 }}>
                    <button onClick={() => ExportToJson(exportData)}>Export TO JSON</button>
                    <button onClick={() => ExportToXL(exportData)}>Export TO XL</button>
                </div>
            </Modal>
        </div>

    )
}



function ExportToJson(data) {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'user-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function ExportToXL(data) {
    if (!data.length) {
        alert('no export data found')
        return
    }
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFile(wb, `User-Data-${moment().format('DD-MM-YY')}.xlsx`)
}