import '../styles/Overlay.css'
import ReactDOM from 'react-dom'

export default function Overlay({ isOpen, overlayTitle, buttonTitle, onClose, onSave, children }) {


    return ReactDOM.createPortal(
        <>
            {isOpen && (
                <div className='overlayContainer'>
                    <div className='overlayBackground'></div>
                    <div className='overlay'>
                        <p className='overlayTitle'>{overlayTitle}</p>
                        <div className='overlayContent'>
                            {children}
                        </div>
                        <div className='overlayButtons'>
                            <button onClick={onClose}>Cancel</button>
                            <button type='submit' onClick={onSave}>{buttonTitle}</button>
                        </div>
                    </div>
                </div>
            )}
        </>,
        document.body
    )
}