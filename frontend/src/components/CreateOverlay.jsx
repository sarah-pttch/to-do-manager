import { useTaskStore } from '../stores/taskStore.jsx'
import { useState } from 'react'
import Overlay from './Overlay.jsx'
import { taskService } from '../services/taskApi.jsx'
import { useCategoryStore } from "../stores/categoryStore.jsx"

export default function CreateOverlay({ isOverlayOpen, setIsOverlayOpen }) {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [deadline, setDeadline] = useState('')
    const [notes, setNotes] = useState('')
    const addTask = useTaskStore((state) => state.addTask)
    const categories = useCategoryStore((state) => state.categories)

    const handleSubmit = async () => {
        try {
            const task = await taskService.create({title, category, deadline, notes})
            addTask(task.data)
            setTitle('')
            setCategory('')
            setDeadline('')
            setNotes('')
            setIsOverlayOpen(!isOverlayOpen)
            alert("Task created successfully")
        } catch(error) {
            alert("Error creating task: " + error)
        }
    }

    return (
        <>
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
                        <option key={item.id} value={item.name}>{item.name}</option>
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