import '../styles/List.css'
import { useEffect, useState } from "react"
import { taskService } from "../services/taskApi"
import { IconContext } from "react-icons"
import { IoCheckmarkCircleOutline, IoCreateOutline, IoTrashOutline } from "react-icons/io5"
import EditOverlay from "../components/EditOverlay"
import {useCategoryStore} from "../stores/categoryStore.jsx";

export default function Longterm() {

    const [tasks, setTasks] = useState([]);
    const [expanded, setExpanded] = useState(-1);
    const [hover, setHover] = useState(-1);
    const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false);
    const [editTask, setEditTask] = useState([]);
    const [listedData, setListedData] = useState([])
    const [filterActive, setFilterActive] = useState(false)
    const [categoryFilter, setCategoryFilter] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const categories = useCategoryStore((state) => state.categories)
    const retrieveData = async () => {
        const taskData = await taskService.getLongterm();
        setTasks(taskData.data);
        if (filterActive) {
            setListedData(taskData.data.filter((task) => task.category === categoryFilter))
        } else {
            setListedData(taskData.data)
        }
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

    const edit = (index) => {
        setEditTask(tasks[index]);
        setIsEditOverlayOpen(!isEditOverlayOpen);
    }

    const handleCheckOff = async (index) => {
        try {
            await taskService.update(tasks[index].id, {
                status: "done",
                creationDate: tasks[index].creationDate,
                title: tasks[index].title,
                category: tasks[index].category,
                deadline: null,
                notes: tasks[index].notes
            });
            retrieveData()
        } catch(error) {
            console.error("Error updating task: ", error)
        }
    }

    const handleDelete = async (index) => {
        try {
            await taskService.delete(tasks[index].id);
            retrieveData()
        } catch (error) {
            console.error("Error deleting task: ", error)
        }
    }

    const filter = (e) => {
        setIsProcessing(true)
        if (e.target.value === 'Select category filter...') {
            setCategoryFilter('')
            setListedData(tasks)
            setFilterActive(false)
        } else {
            setCategoryFilter(e.target.value)
            setListedData(tasks.filter((task) => task.category === e.target.value))
            setFilterActive(true)
        }
        setIsProcessing(false)
    }

    return (
        <div className='listContainer'>
            <p className='listTitle'>List of longterm tasks</p>
            <div className='selectContainer'>
                <select
                    className='topSelect'
                    id='categoryFilter'
                    value={categoryFilter}
                    onChange={filter}
                >
                    <option>Select category filter...</option>
                    {categories.map((item) => (
                        <option key={item.id} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className='listContent'>
                <div className='listItemsContainer'>
                    <div className='legend'>
                        <div className='legendComponent'>Task</div>
                        <div className='legendComponent'>Category</div>
                        <div className='legendComponent'>Creation date</div>
                        <div className='legendComponent'>Notes</div>
                    </div>
                    {isProcessing ? (
                        <div className='alternatives'>Processing...</div>
                    ) : (
                        listedData.length > 0 ? (
                            listedData.map((item, index) => (
                                <li
                                    key={index} className='longtermListItem'
                                    onClick={() => handleClick(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(-1)}
                                >
                                    <div className={`listItemComponent ${expanded === index ? 'expanded' : ''}`}>{item.title}</div>
                                    <div className={`listItemComponent ${expanded === index ? 'expanded' : ''}`}>{item.category}</div>
                                    <div className={`listItemComponent ${expanded === index ? 'expanded' : ''}`}>{item.creationDate}</div>
                                    <div className={`listItemComponent ${expanded === index ? 'expanded' : ''}`}>{item.notes}</div>
                                    <div className={`hoverButtonContainer ${hover === index ? 'visible' : 'hidden'}`}>
                                        <button
                                            className='actionButton'
                                            title='Edit task'
                                            onClick={() => edit(index)}
                                        >
                                            <IconContext value={{size: '1.5em'}}>
                                                <IoCreateOutline/>
                                            </IconContext>
                                        </button>
                                        <button
                                            className='actionButton'
                                            title='Mark task as done'
                                            onClick={() => handleCheckOff(index)}
                                        >
                                            <IconContext value={{size: '1.5em'}}>
                                                <IoCheckmarkCircleOutline/>
                                            </IconContext>
                                        </button>
                                        <button
                                            className='actionButton'
                                            title='Delete task'
                                            onClick={() => handleDelete(index)}
                                        >
                                            <IconContext value={{size: '1.5em'}}>
                                                <IoTrashOutline/>
                                            </IconContext>
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <div className='alternatives'>No matches found</div>
                        )
                    )}
                </div>
            </div>
            <EditOverlay
                item={editTask}
                action={retrieveData}
                isOverlayOpen={isEditOverlayOpen}
                setIsOverlayOpen={setIsEditOverlayOpen}
            />
        </div>
    )
}