import { useState } from "react"
import { subtaskService } from "../services/subtaskApi.jsx"
import Overlay from "./Overlay.jsx"


export default function SubtaskOverlay({ taskId, isOverlayOpen, setIsOverlayOpen, setSubtasks }) {
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        try {
            const newSubtask = await subtaskService.create({description, taskId})
            setDescription('')
            setIsOverlayOpen(!isOverlayOpen)
            setSubtasks(prevSubtasks => [...prevSubtasks, newSubtask.data])
            alert("Subtask added successfully")
        } catch (error) {
            alert("Error creating subtask: " + error)
        }
    }

    return (
        <>
            <Overlay
                isOpen={isOverlayOpen}
                overlayTitle={'Add a subtask'}
                buttonTitle={'Save'}
                onClose={() => {
                    setIsOverlayOpen(!isOverlayOpen)
                }}
                onSave={handleSubmit}
            >
                <label>Description: </label>
                <input id='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
            </Overlay>
        </>
    )
}