import { useState } from "react";
import { categoriesService } from "../services/categoriesApi.jsx";
import Overlay from "./Overlay.jsx";


export default function CategoryOverlay({ onAdd }) {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [name, setName] = useState('');

    const handleSubmit = async () => {
        try {
            await categoriesService.create({name})
            setName('')
            setIsOverlayOpen(!isOverlayOpen)
            onAdd();
            alert("Category created successfully")
        } catch (error) {
            alert("Error creating category: " + error)
        }
    }

    return (
        <>
            <button className='overlayButton' onClick={() => setIsOverlayOpen(!isOverlayOpen)}>Add category</button>
            <Overlay
                isOpen={isOverlayOpen}
                overlayTitle={'Create a new category'}
                buttonTitle={'Save'}
                onClose={() => {
                    setIsOverlayOpen(!isOverlayOpen)
                }}
                onSave={handleSubmit}
            >
                <label>Name: </label>
                <input id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </Overlay>
        </>
    )
}