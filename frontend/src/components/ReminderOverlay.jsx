import { useState } from "react"
import Overlay from "./Overlay"
import { reminderService } from "../services/reminderApi"


export default function ReminderOverlay({ item, isOverlayOpen, setIsOverlayOpen }) {
    const [reminderDate, setReminderDate] = useState('');

    const handleSubmit = async () => {
        try {
            await reminderService.create({reminderDate, taskId: item.id, taskTitle: item.title, taskDeadline: item.deadline})
            setReminderDate('')
            setIsOverlayOpen(!isOverlayOpen)
            alert("Reminder set up successfully")
        } catch (error) {
            alert("Error setting up reminder: " + error)
        }
    }

    return (
        <>
            <Overlay
                isOpen={isOverlayOpen}
                overlayTitle={'Set up a reminder'}
                buttonTitle={'Save'}
                onClose={() => {
                    setIsOverlayOpen(!isOverlayOpen)
                }}
                onSave={handleSubmit}
            >
                <label>Reminder date: </label>
                <input
                    id='reminderDate'
                    type='date'
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                />
            </Overlay>
        </>
    )
}