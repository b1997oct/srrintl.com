import React, { useState } from 'react'

export default function useError(schema = [], py = {}) {

    const [data, setData] = useState({}),
        errors = {}, values = {}

    schema.forEach(d => {
        let { name, error } = d
        if (!error) return
        const { min, max, required } = error
        const value = data[name] || py?.[name] || ''
        values[name] = value
        try {
            requiredVAl(value, required)
            minVal(value, min)
            maxVal(value, max)
        } catch (err) {
            errors[name] = name + ' ' + err.message
        }
    })

    function isError() {
        const name = Object.keys(errors)[0]
        if (name) {
            document.getElementsByName(name).forEach(d => d.focus())
        }
        return name
    }

    function inputParse({ max, required, min, name, error, ...val }) {
        const onChange = e => {
            let { value } = e.target
            setData({ ...data, [name]: value })
        }

        return { onChange, errorText: errors[name], name, value: values[name] || '', ...val }
    }

    return { isError, inputParse, data, setData }
}


function requiredVAl(val, required) {
    if (required == true && !val) {
        throw Error('is required')
    }
}

function minVal(val, min) {
    if (min == undefined) return
    val = val || ''
    if (val.length < min) {
        throw Error('min ' + min + ' required')
    }
}

function maxVal(val, max) {
    if (max == undefined) return
    val = val || ''
    if (val.length > max) {
        throw Error('max is ' + max)
    }
}