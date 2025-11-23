import '../styles/List.css'
import { useEffect, useState } from "react";
import { taskService } from "../services/taskApi.jsx";

export default function Archive() {

    const [tasks, setTasks] = useState([]);
    const [expanded, setExpanded] = useState(-1);
    const retrieveData = async () => {
        const taskData = await taskService.getArchive();
        setTasks(taskData.data);
    }

    useEffect(() => {
        retrieveData();
    }, []);

    const handleClick = (index) => {
        if (expanded !== index) {
            setExpanded(index)
        } else {
            setExpanded(-1)
        }
    }

    return (
        <div className='listContainer space'>
            <p className='listTitle'>List of completed tasks</p>
            <div className='listContent'>
                <div className='listItemsContainer'>
                    <div className='legend'>
                        <div className='legendComponent'>Task</div>
                        <div className='legendComponent'>Category</div>
                        <div className='legendComponent'>Completion date</div>
                        <div className='legendComponent'>Notes</div>
                    </div>
                    {tasks.map((item, index) => (
                            <li
                                key={index}
                                className='archiveListItem'
                                onClick={() => handleClick(index)}
                            >
                                <div className={`listItemComponent ${expanded === index ? 'expanded' : ''}`}>{item.title}</div>
                                <div className={`listItemComponent ${expanded === index ? 'expanded' : ''}`}>{item.category}</div>
                                <div className={`listItemComponent ${expanded === index ? 'expanded' : ''}`}>{item.completionDate}</div>
                                <div className={`listItemComponent ${expanded === index ? 'expanded' : ''}`}>{item.notes}</div>
                            </li>
                        ))}
                </div>
            </div>
        </div>
    )
}