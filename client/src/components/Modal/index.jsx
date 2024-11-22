import { createPortal } from 'react-dom'
import './modal.scss'
import ClickAwayListener from '../ClickAwayListener'



export default function Modal({ open, onClose, children }) {
    return open && createPortal(
        <div className='modal'>
            <ClickAwayListener onClickAway={onClose} className={`${open ? 'open' : 'close'} modal-content`}>
                {children}
            </ClickAwayListener>
        </div>, document.getElementById('modal'))
}
