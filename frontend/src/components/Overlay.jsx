import '../styles/Overlay.css'

export default function Overlay({ isOpen, overlayTitle, buttonTitle, onClose, onSave, children }) {


    return (
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
                            <button onClick={onClose}>{buttonTitle}</button>
                            <button onClick={onSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}