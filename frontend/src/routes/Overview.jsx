import "../styles/Overview.css"
import Slider from '../components/Slider'
import List from '../components/List'
import { useEffect, useState } from "react"
import { useTaskStore } from "../stores/taskStore"
import { reminderService } from "../services/reminderApi"
import Reminder from "../components/Reminder.jsx"
import TaskDetails from "../components/TaskDetails.jsx";

export default function Overview() {

    const tasks = useTaskStore((state) => state.tasks)
    const [reminders, setReminders] = useState([])
    const retrieveData = async () => {
        try {
            const reminderData = await reminderService.getAll()
            setReminders(reminderData.data)
        } catch (error) {
            console.error("Reminders could not be loaded", error)
        }
    }
    const [selectedTask, setSelectedTask] = useState([])
    const [detailsVisible, setDetailsVisible] = useState(false)

    useEffect(() => {
        retrieveData()
    }, []);

    return (
        <div className='overviewContainer'>
            <Slider data={tasks} setSelectedTask={setSelectedTask} openDetails={setDetailsVisible} />
            <div className='container'>
                <List data={tasks} setSelectedTask={setSelectedTask} openDetails={setDetailsVisible} />
                <TaskDetails task={selectedTask} visible={detailsVisible} setVisible={setDetailsVisible} />
            </div>
            {reminders.map(reminder => (
                    <Reminder reminder={reminder} />
                ))
            }
        </div>
    )
}