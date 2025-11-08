import Slider from '../components/Slider'
import List from '../components/List'
import { useEffect, useState } from "react"
import { useTaskStore } from "../stores/taskStore"
import { reminderService } from "../services/reminderApi"
import Reminder from "../components/Reminder.jsx"

export default function Overview() {

    const tasks = useTaskStore((state) => state.tasks)
    const fetchTasks = useTaskStore((state) => state.fetchTasks)
    const [reminders, setReminders] = useState([])
    const retrieveData = async () => {
        try {
            const reminderData = await reminderService.getAll()
            setReminders(reminderData.data)
        } catch (error) {
            console.error("Reminders could not be loaded", error)
        }
    }

    useEffect(() => {
        fetchTasks()
        retrieveData()
    }, []);

    return (
        <>
            <Slider data={tasks} />
            <List data={tasks} />
            {reminders.map(reminder => (
                    <Reminder reminder={reminder} />
                ))
            }
        </>
    )
}