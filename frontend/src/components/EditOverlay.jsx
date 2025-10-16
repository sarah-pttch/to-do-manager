import { useEffect, useState } from 'react'
import Overlay from './Overlay.jsx'
import { useTaskStore } from "../stores/taskStore.jsx"
import { useCategoryStore } from "../stores/categoryStore.jsx"

export default function EditOverlay({ item, action, isOverlayOpen, setIsOverlayOpen }) {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [deadline, setDeadline] = useState('')
    const [notes, setNotes] = useState('')
    const [deadlineDisabled, setDeadlineDisabled] = useState(false)
    const updateTask = useTaskStore((state) => state.updateTask)
    const categories = useCategoryStore((state) => state.categories)

    useEffect(() => {
        setTitle(item.title);
        setCategory(item.category);
        //should not be null
        setDeadline(item.deadline);
        setNotes(item.notes);
        if (item.deadline === null) {
            setDeadlineDisabled(true);
        }
    }, [item]);

    const handleDisableDeadline = () => {
        setDeadlineDisabled(!deadlineDisabled)
        setDeadline('')
    }

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
            setDeadlineDisabled(false)
            setIsOverlayOpen(!isOverlayOpen)
            action()
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
                <div className='deadlineContainer'>
                    <input id='deadline' type='date' disabled={deadlineDisabled} value={deadline}
                           onChange={(e) => setDeadline(e.target.value)}/>
                    <label>
                        <input type='checkbox' className='deadlineCheckbox' checked={deadlineDisabled}
                               onChange={handleDisableDeadline}/>
                        No deadline
                    </label>
                </div>
                <label>Notes:</label>
                <textarea id='notes' rows="5" cols="50" value={notes} onChange={(e) => setNotes(e.target.value)}/>
            </Overlay>
        </>
    )
}