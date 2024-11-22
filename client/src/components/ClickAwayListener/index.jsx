import { useEffect, useRef } from 'react';


export default function ClickAwayListener({ value, onClickAway, className, ...props }) {

    const ref = useRef(null);
    useEffect(() => {
        const handle = e => {
            if (onClickAway && ref.current && !ref.current.contains(e.target)) {
                onClickAway(value);
            }
        };

        document.addEventListener('mousedown', handle);

        return () => {
            document.removeEventListener('mousedown', handle);
        };
    }, [onClickAway]);

    return <div ref={ref} className={className}  {...props} />
};
