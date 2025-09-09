import '../styles/Settings.css'
import { useEffect, useState } from "react";
import { categoriesService } from "../services/categoriesApi.jsx";
import CategoryOverlay from "../components/CategoryOverlay.jsx";

export default function Settings() {

    const [categories, setCategories] = useState([]);
    const retrieveData = async () => {
        const data = await categoriesService.getAll();
        setCategories(data.data);
    }

    useEffect(() => {
        retrieveData();
    }, []);

    const CategoryItem = ({ category }) => {

        const removeCategory = async () => {
            try {
                await categoriesService.delete(category.id);
                retrieveData();
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
                <CategoryOverlay onAdd={retrieveData} />
            </div>
        </div>
    )
}