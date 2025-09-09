import { useEffect, useState } from 'react'
import Overlay from './Overlay.jsx'
import { toDoService } from '../services/toToApi.jsx'

export default function EditOverlay({ item, closePreview, isOverlayOpen, setIsOverlayOpen, onUpdate, categories }) {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [deadline, setDeadline] = useState('')
    const [notes, setNotes] = useState('')

    useEffect(() => {
        setTitle(item.title);
        setCategory(item.category);
        setDeadline(item.deadline);
        setNotes(item.notes);
    }, [item]);

    const handleSubmit = async () => {
        try {
            await toDoService.update(item.id, {status: "open", title, category, deadline, notes})
            setTitle('')
            setCategory('')
            setDeadline('')
            setNotes('')
            setIsOverlayOpen(!isOverlayOpen)
            closePreview(false);
            onUpdate();
            alert("ToDo updated successfully")
        } catch(error) {
            alert("Error updating ToDo: " + error)
        }
    }

    return (
        <>
            <Overlay
                isOpen={isOverlayOpen}
                overlayTitle={'Edit ToDo'}
                buttonTitle={'Save'}
                onClose={() => {
                    setIsOverlayOpen(!isOverlayOpen)
                }}
                onSave={handleSubmit}
            >
                <label>Title: </label>
                <input id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label>Category: </label>
                <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option></option>
                    {categories.map((item) => (
                        <option value={item.name}>{item.name}</option>
                    ))}
                </select>
                <label>Deadline: </label>
                <input id='deadline' type='date' value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
                <label>Notes:</label>
                <textarea id='notes' rows="5" cols="50" value={notes} onChange={(e) => setNotes(e.target.value)}/>
            </Overlay>
        </>
    )
}