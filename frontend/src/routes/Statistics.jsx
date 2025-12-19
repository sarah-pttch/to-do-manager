import '../styles/Statistics.css'
import { useEffect, useState } from "react"
import { taskService } from "../services/taskApi.jsx"
import PieChart from "../components/PieChart.jsx"
import { useTaskStore } from "../stores/taskStore.jsx"

export default function Statistics() {

    const tasks = useTaskStore((state) => state.tasks)
    const [completedTasks, setCompletedTasks] = useState([])
    const [statistics, setStatistics] = useState([])
    const retrieveData = async () => {
        const retrievedStatistics = await taskService.getStatistics()
        setStatistics(retrievedStatistics.data)
        const completedTaskData = await taskService.getArchive()
        setCompletedTasks(completedTaskData.data)
    }

    useEffect( () => {
        retrieveData()
    }, []);

    return (
        <div className='container'>
            <h1>Statistics</h1>
            <div className='comment'>(Only tasks with deadline)</div>
            <div className='statisticsOverviewContainer'>
                <div className='statisticContainer'>
                    <h3>Tasks completed</h3>
                    {statistics.numberTasks === 0 ? (
                        <div className='percentage'>--%</div>
                    ) : (
                        <div
                            className='percentage'>{Math.round(statistics.numberCompletedTasks / statistics.numberTasks * 100)}%</div>
                    )}
                </div>
                <div className='statisticContainer'>
                    <h3>Average time to task completion</h3>
                    {statistics.numberCompletedTasks === 0 ? (
                        <div className='percentage'>-- days</div>
                    ) : (
                        <div className='percentage'>{statistics.totalDays / statistics.numberCompletedTasks} days</div>
                    )}
                </div>
                <div className='statisticContainer'>
                    <h3>Tasks completed in time</h3>
                    {statistics.numberCompletedTasks === 0 ? (
                        <div className='percentage'>--%</div>
                    ) : (
                        <div
                            className='percentage'>{Math.round(statistics.numberInTime / statistics.numberCompletedTasks * 100)}%</div>
                    )}
                </div>
                <div className='statisticContainer'>
                    <h3>Average days past deadline</h3>
                    {statistics.averageDaysSurpassed === 0 ? (
                        <div className='percentage'>-- days</div>
                    ) : (
                        <div
                            className='percentage'>{Number(statistics.averageDaysSurpassed).toFixed(1)} days</div>
                    )}
                </div>
            </div>
            <div className='statisticsOverviewContainer'>
                <div className='statisticContainer'>
                    <h3>Completed tasks by category</h3>
                    <PieChart tasks={completedTasks} label='Completed tasks' />
                </div>
                <div className='statisticContainer'>
                    <h3>Open tasks by category</h3>
                    <PieChart tasks={tasks} label='Open tasks' />
                </div>
            </div>
        </div>
    )
}