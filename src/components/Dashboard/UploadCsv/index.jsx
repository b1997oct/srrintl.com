import React, { useRef } from 'react'
import Parse from 'parse'

export default function UploadCsv({ onChange }) {

    const inputRef = useRef()

    const handleFile = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target.result;
            onChange(parseCSV(text))
        };

        reader.readAsText(file);
    };


    return (
        <div>
            <input ref={inputRef} type="file" accept='.csv' hidden onChange={handleFile} />
            <button onClick={() => inputRef.current.click()} className='upload-csv-btn'>Upload CSV</button>
        </div>
    )
}


const parseCSV = (text) => {
    const rows = text.split("\n");
    const headers = rows[0].split(",").map((header) => header.trim());
    const parsedRows = rows.slice(1).map((row) => {
        const values = row.split(",").map((value) => value.trim());
        return headers.reduce((acc, header, index) => {
            acc[header] = values[index];
            return acc;
        }, {});
    });
    return parsedRows.filter((row) => Object.values(row).some((val) => val))
};