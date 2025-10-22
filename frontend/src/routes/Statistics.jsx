import '../styles/Statistics.css'
import { useEffect, useState } from "react"
import { taskService } from "../services/taskApi.jsx"
import PieChart from "../components/PieChart.jsx";

export default function Statistics() {

    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [totalDays, setTotalDays] = useState(0)
    const retrieveData = async () => {
        const taskData = await taskService.getAll()
        setTasks(taskData.data)
        setCompletedTasks(taskData.data.filter((task) => task.status === 'done'))
    }

    useEffect(() => {
        retrieveData()
        setTotalDays(completedTasks.reduce((acc, task) => {
            return acc + ((task.completionDate - task.creationDate) / 86400000)
        }, 0))
    }, []);

    return (
        <div>
            <h1>Statistics</h1>
            <div className='statisticsOverviewContainer'>
                <div className='statisticContainer'>
                    <h3>Tasks completed</h3>
                    {tasks.length === 0 ? (
                        <div className='percentage'>--%</div>
                    ) : (
                        <div className='percentage'>{Math.round(completedTasks.length / tasks.length * 100)}%</div>
                    )}
                </div>
                <div className='statisticContainer'>
                <h3>Average time to task completion</h3>
                    {completedTasks.length === 0 ? (
                        <div className='percentage'>-- days</div>
                    ) : (
                        <div className='percentage'>{totalDays / completedTasks.length} days</div>
                    )}
                </div>
            </div>
            <PieChart completedTasks={completedTasks} />
        </div>
    )
}