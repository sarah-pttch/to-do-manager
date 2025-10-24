import '../styles/Statistics.css'
import { useEffect, useState } from "react"
import { taskService } from "../services/taskApi.jsx"
import PieChart from "../components/PieChart.jsx";

export default function Statistics() {

    const [tasks, setTasks] = useState([])
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
        <div>
            <h1>Statistics</h1>
            <div className='statisticsOverviewContainer'>
                <div className='statisticContainer'>
                    <h3>Tasks completed</h3>
                    {statistics.numberTasks === 0 ? (
                        <div className='percentage'>--%</div>
                    ) : (
                        <div className='percentage'>{Math.round(statistics.numberCompletedTasks / statistics.numberTasks * 100)}%</div>
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
                        <div className='percentage'>{statistics.numberInTime / statistics.numberCompletedTasks * 100}%</div>
                    )}
                </div>
            </div>
            <PieChart completedTasks={completedTasks} />
        </div>
    )
}