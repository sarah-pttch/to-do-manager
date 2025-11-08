import { useState } from "react"
import { categoryService } from "../services/categoryApi.jsx"
import Overlay from "./Overlay.jsx"
import { useCategoryStore } from "../stores/categoryStore.jsx"


export default function CategoryOverlay() {
    const addCategory = useCategoryStore((state) => state.addCategory)
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [name, setName] = useState('');

    const handleSubmit = async () => {
        try {
            const category = await categoryService.create({name})
            addCategory(category.data)
            setName('')
            setIsOverlayOpen(!isOverlayOpen)
            alert("Category created successfully")
        } catch (error) {
            alert("Error creating category: " + error)
        }
    }

    const handleCancel = () => {
        setIsOverlayOpen(!isOverlayOpen)
        setName('')
    }

    return (
        <>
            <button
                className='overlayButton'
                onClick={() => setIsOverlayOpen(!isOverlayOpen)}
            >
                Add category
            </button>
            <Overlay
                isOpen={isOverlayOpen}
                overlayTitle={'Create a new category'}
                buttonTitle={'Save'}
                onClose={handleCancel}
                onSave={handleSubmit}
            >
                <label>Name: </label>
                <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Overlay>
        </>
    )
}