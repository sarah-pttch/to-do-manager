import Slider from '../components/Slider.jsx'
import List from '../components/List.jsx'
import CreateOverlay from "../components/CreateOverlay.jsx";
import { useEffect, useState } from "react";
import { taskService } from "../services/taskApi.jsx";
import { categoriesService } from "../services/categoriesApi.jsx";

export default function Overview() {

    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const retrieveData = async () => {
        const taskData = await taskService.getAll();
        setTasks(taskData.data);
        const categoryData = await categoriesService.getAll();
        setCategories(categoryData.data);
    }

    useEffect(() => {
        retrieveData();
    }, []);

    return (
        <>
            <CreateOverlay onAdd={retrieveData} categories={categories} />
            <Slider data={tasks} />
            <List data={tasks} onUpdate={retrieveData} categories={categories} />
        </>
    )
}