import React, { useState } from 'react'
import UploadCsv from './UploadCsv'
import UploadXL from './UploadXL'
import './dashboard.css'
import Filters, { filtersIt } from './Fillters'
import Search from './Search'
import Table from './Table'
import Pagination from './Pagination'

let data = []


export default function Dashboard() {

    const [filters, setFilters] = useState({}),
        [page, setPage] = useState({ limit: 25, skip: 0, sortKey: '', sortOrder: 0 }),
        isData = data.length

       console.log(page);
    const onChange = val => {
        const f = {}
        Object.keys(val[0]).map(d => {
            f[d] = { datatype: 'string', searchType: 'includes', value: '' }
        })
        data = val
        setFilters(f)

    }

    const onFilters = ({ name, value }) => {
        setFilters({ ...filters, [name]: value })
    }

    const onSearch = ({ name, value }) => {
        const f = { datatype: 'string', value, searchType: 'includes' }
        onFilters({ name, value: f })
    }


    const onPageChange = (val) => setPage({ ...page, ...val })
    const onSort = ({ sortKey, sortOrder }) => {
        if (sortOrder == 1 || sortOrder == -1) {
            onPageChange({ sortOrder, sortKey })
        } else {
            onPageChange({ sortOrder: '', sortKey: 0 })
        }
    }

    const labels = Object.keys(data[0] || {})

    const sortIt = (a, b) => {
        const { sortKey, sortOrder } = page
        if (sortOrder == 1) {
            return a[sortKey] - b[sortKey]
        } else if (sortOrder == -1){
            return b[sortKey] - a[sortKey]
        }
    }

    const filterIt = (d) => {
        for (let key of Object.keys(filters)) {
            const dataValue = d[key]
            const { datatype, value, searchType } = filters[key]
            if (!value) return true
            const fn1 = filtersIt[datatype]
            if (typeof fn1 == 'function') {
                return fn1(dataValue, value)
            } else {
                const fn2 = fn1[searchType]
                return fn2?.(dataValue, value)
            }
        }
    }

    const skipTo = page.skip + page.limit
    const currentData = data.sort(sortIt).filter(filterIt)
    const totalData = currentData.length
    const mapData = currentData.slice(page.skip, skipTo)

    return (
        <div className=''>
            <nav>
                <h2>Dashboard</h2>
            </nav>
            <div className='upload-buttons-group'>
                <UploadCsv onChange={onChange} />
                <UploadXL onChange={onChange} />
            </div>

            {!isData ?
                <div className='upload-file'>
                    <br />
                    <br />
                    <h1>Upload File To Preview</h1>
                </div>
                :
                <div>
                    <Search filters={filters} onChange={onSearch} />
                    <Filters filters={filters} labels={labels} total={totalData} onChange={onFilters} />
                    <Table {...page} onChange={onSort} data={mapData} labels={labels} />
                    <Pagination total={totalData} onChange={onPageChange}  {...page} />
                </div>}

        </div>
    )
}
