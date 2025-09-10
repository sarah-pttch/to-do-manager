import { useState } from 'react'
import Overlay from './Overlay.jsx'
import { taskService } from '../services/taskApi.jsx'

export default function CreateOverlay({ onAdd, categories }) {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [deadline, setDeadline] = useState('')
    const [notes, setNotes] = useState('')

    const handleSubmit = async () => {
        try {
            await taskService.create({status: "open", title, category, deadline, notes})
            setTitle('')
            setCategory('')
            setDeadline('')
            setNotes('')
            setIsOverlayOpen(!isOverlayOpen)
            onAdd();
            alert("Task created successfully")
        } catch(error) {
            alert("Error creating task: " + error)
        }
    }

    return (
        <>
            <button onClick={() => setIsOverlayOpen(!isOverlayOpen)}>Open Overlay</button>
            <Overlay
                isOpen={isOverlayOpen}
                overlayTitle={'Create a new task'}
                buttonTitle={'Save'}
                onClose={() => {
                    setIsOverlayOpen(!isOverlayOpen)
                }}
                onSave={handleSubmit}
            >
                <label>Title: </label>
                <input id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Category: </label>
                <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option></option>
                    {categories.map((item) => (
                        <option value={item.name}>{item.name}</option>
                    ))}
                </select>
                <label>Deadline: </label>
                <input id='deadline' type='date' value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                <label>Notes:</label>
                <textarea id='notes' rows="5" cols="50" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Overlay>
        </>
    )
}