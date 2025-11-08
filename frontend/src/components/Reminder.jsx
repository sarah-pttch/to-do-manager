import '../styles/Overlay.css'
import ReactDOM from 'react-dom'
import {useState} from "react";
import { reminderService } from "../services/reminderApi"

export default function Reminder({ reminder }) {

    const [isOpen, setIsOpen] = useState(true)

    const onClose = async () => {
        setIsOpen(false)
        reminderService.delete(reminder.id)
    }

    return ReactDOM.createPortal(
        <>
            {isOpen && (
                <div className='overlayContainer'>
                    <div className='overlayBackground'></div>
                    <div className='overlay'>
                        <p className='overlayTitle'>!Reminder!</p>
                        <div className='overlayContent'>
                            <div>{reminder.taskTitle}</div>
                            <div>The task is ending on ${reminder.taskDeadline}</div>
                        </div>
                        <div className='overlayButtons'>
                            <button onClick={onClose}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </>,
        document.body
    )
}