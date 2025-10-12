import '../styles/List.css'
import { useEffect, useState } from "react";
import { taskService } from "../services/taskApi.jsx";

export default function Archive() {

    const [tasks, setTasks] = useState([]);
    const retrieveData = async () => {
        const taskData = await taskService.getArchive();
        setTasks(taskData.data);
    }

    useEffect(() => {
        retrieveData();
    }, []);

    return (
        <div className='listContainer'>
            <p className='listTitle'>List of completed tasks</p>
            <div className='listContent'>
                <div className='listItemsContainer'>
                    {tasks.map((item, index) => (
                            <li key={index} className='archiveListItem'>
                                <div>{item.title}</div>
                                <div>{item.category}</div>
                                <div>{item.completionDate}</div>
                            </li>
                        ))}
                </div>
            </div>
        </div>
    )
}