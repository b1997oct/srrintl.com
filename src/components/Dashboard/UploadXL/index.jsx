import React, { useRef } from 'react'
import * as xlsx from 'xlsx'


export default function UploadXL({ onChange }) {

  const inputRef = useRef(null)

  const handleFile = (event) => {

    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target.result;
        const workbook = xlsx.read(result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
        onChange(jsonData);
      } catch (err) {
        alert(err.message)
        console.log(err);
      }
    }
    
    reader.readAsArrayBuffer(file);

  };

  return (
    <div>
      <input ref={inputRef} type='file' accept='.xls,.xlsx' hidden onChange={handleFile} />
      <button onClick={() => inputRef.current.click()} className='upload-xl-btn'>Upload XL</button>
    </div>
  )
}
