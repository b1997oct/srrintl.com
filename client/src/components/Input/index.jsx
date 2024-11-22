import { useId, useState } from "react"
import './input.scss'


export default function Input({
    label,
    touched,
    errorText,
    ...props
}) {

    const [b, setB] = useState(false)
    const id = useId()
    const err = (b || touched) && Boolean(errorText)

    return (
        <div className={`input-container`} >
            <label htmlFor={id}>{label}</label>
                <input
                    id={id}
                    onBlur={() => setB(true)}
                    {...props} />
            {err && <div className="text-error">{errorText}</div>}
        </div>
    )
}