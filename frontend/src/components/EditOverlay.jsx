import {useEffect, useState} from 'react'
import Overlay from './Overlay.jsx'
import { toDoService } from '../services/api.jsx'

export default function EditOverlay({ item, closePreview, isOverlayOpen, setIsOverlayOpen, onUpdate }) {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [deadline, setDeadline] = useState('')

    useEffect(() => {
        setTitle(item.title);
        setCategory(item.category);
        setDeadline(item.deadline);
    }, [item]);

    const handleSubmit = async () => {
        try {
            await toDoService.update(item.id, {title, category, deadline})
            setTitle('')
            setCategory('')
            setDeadline('')
            setIsOverlayOpen(!isOverlayOpen)
            closePreview(false);
            onUpdate();
            alert("ToDo updated successfully")
        } catch(error) {
            alert("Error updating ToDo: " + error)
        }
    }
    // placeholder when backend not running
    // const handleSubmit = () => {
    //     setTitle('')
    //     setCategory('')
    //     setDeadline('')
    //     setIsOverlayOpen(!isOverlayOpen)
    // }

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
                <input id='category' type='text' value={category} onChange={(e) => setCategory(e.target.value)}/>
                <label>Deadline: </label>
                <input id='deadline' type='date' value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
            </Overlay>
        </>
    )
}