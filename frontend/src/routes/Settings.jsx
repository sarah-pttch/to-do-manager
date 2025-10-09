import '../styles/Settings.css'
import CategoryOverlay from "../components/CategoryOverlay.jsx"
import { useCategoryStore } from "../stores/categoryStore.jsx"

export default function Settings() {

    const categories = useCategoryStore((state) => state.categories)
    const deleteCategory = useCategoryStore((state) => state.deleteCategory)

    const CategoryItem = ({ category }) => {

        const removeCategory = async () => {
            try {
                await deleteCategory(category.id)
            } catch (error) {
                alert("Error deleting category: " + error)
            }
        }

        return (
            <div className='categoryItem'>
                <p className='categoryName'>{category.name}</p>
                <button className='remove' onClick={removeCategory}>X</button>
            </div>
        )
    }

    return (
        <div className='categoriesContainer'>
            <p className='title'>Categories</p>
            <div className='content'>
                {categories.map((category, index) => (
                    <CategoryItem key={index} category={category} />
                    ))}
                <CategoryOverlay />
            </div>
        </div>
    )
}