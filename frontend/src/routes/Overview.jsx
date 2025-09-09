import Slider from '../components/Slider.jsx'
import List from '../components/List.jsx'
import CreateOverlay from "../components/CreateOverlay.jsx";
import { useEffect, useState } from "react";
import { toDoService } from "../services/toToApi.jsx";
import {categoriesService} from "../services/categoriesApi.jsx";

export default function Overview() {

    const [toDos, setToDos] = useState([]);
    const [categories, setCategories] = useState([]);
    const retrieveData = async () => {
        const toDoData = await toDoService.getAll();
        setToDos(toDoData.data);
        const categoryData = await categoriesService.getAll();
        setCategories(categoryData.data);
    }

    useEffect(() => {
        retrieveData();
    }, []);

    return (
        <>
            <CreateOverlay onAdd={retrieveData} categories={categories} />
            <Slider data={toDos} />
            <List data={toDos} onUpdate={retrieveData} categories={categories} />
        </>
    )
}