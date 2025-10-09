import Slider from '../components/Slider.jsx'
import List from '../components/List.jsx'
import { useEffect } from "react"
import { useTaskStore } from "../stores/taskStore.jsx"

export default function Overview() {

    const tasks = useTaskStore((state) => state.tasks)
    const fetchTasks = useTaskStore((state) => state.fetchTasks)

    useEffect(() => {
        fetchTasks()
    }, []);

    return (
        <>
            <Slider data={tasks} />
            <List data={tasks} />
        </>
    )
}