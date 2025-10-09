import { useEffect, useState } from 'react'
import Overlay from './Overlay.jsx'
import { useTaskStore } from "../stores/taskStore.jsx"
import { useCategoryStore } from "../stores/categoryStore.jsx"

export default function EditOverlay({ item, closePreview, isOverlayOpen, setIsOverlayOpen }) {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [deadline, setDeadline] = useState('')
    const [notes, setNotes] = useState('')
    const updateTask = useTaskStore((state) => state.updateTask)
    const categories = useCategoryStore((state) => state.categories)

    useEffect(() => {
        setTitle(item.title);
        setCategory(item.category);
        setDeadline(item.deadline);
        setNotes(item.notes);
    }, [item]);

    const handleSubmit = async () => {
        try {
            await updateTask(item.id, {
                status: "open",
                creationDate: item.creationDate,
                title,
                category,
                deadline,
                notes
            })
            setTitle('')
            setCategory('')
            setDeadline('')
            setNotes('')
            setIsOverlayOpen(!isOverlayOpen)
            closePreview(false);
            // onUpdate();
            alert("Task updated successfully")
        } catch(error) {
            alert("Error updating task: " + error)
        }
    }

    return (
        <>
            <Overlay
                isOpen={isOverlayOpen}
                overlayTitle={'Edit task'}
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
                    {categories.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
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