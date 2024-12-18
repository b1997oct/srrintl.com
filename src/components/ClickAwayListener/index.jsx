import { useEffect, useRef } from 'react';

// interface Props extends React.HTMLAttributes<HTMLDivElement> {
//     value?: any
//     onClickAway?: (value?: any) => void;
// }

export default function ClickAwayListener({ value, onClickAway, ...props }) {

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

    return <div ref={ref}  {...props} />
};
