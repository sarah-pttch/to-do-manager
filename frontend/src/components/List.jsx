import "../styles/List.css"
import {useEffect, useState} from "react"
import EditOverlay from "./EditOverlay.jsx"
import {
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoCreateOutline,
    IoAddCircleOutline,
    IoCheckmarkSharp,
    IoTrashOutline
} from "react-icons/io5"
import { IconContext } from "react-icons"
import SubtaskOverlay from "./SubtaskOverlay.jsx"
import { subtaskService } from "../services/subtaskApi.jsx"
import { useTaskStore } from "../stores/taskStore.jsx"
import { useCategoryStore } from "../stores/categoryStore.jsx"

export default function List({ data }) {

    const [listedData, setListedData] = useState([])
    const [filterActive, setFilterActive] = useState(false)
    const [categoryFilter, setCategoryFilter] = useState('')
    // const [sortActive, setSortActive] = useState(false)
    const [sorting, setSorting] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewItem, setPreviewItem] = useState([])
    const [previewSubtasks, setPreviewSubtasks] = useState([])
    const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false)
    const [isSubtaskOverlayOpen, setIsSubtaskOverlayOpen] = useState(false)
    const [subtasksLoading, setSubtasksLoading] = useState(false)
    const checkOffTask = useTaskStore((state) => state.checkOffTask)
    const deleteTask = useTaskStore((state) => state.deleteTask)
    const categories = useCategoryStore((state) => state.categories)

    const retrieveData = async (taskId) => {
        setSubtasksLoading(true)
        try {
            const subtasksData = await subtaskService.getAllByTaskId(taskId)
            setPreviewSubtasks(subtasksData.data)
        } catch (error) {
            console.error("No subtasks for this task", error)
        } finally {
            setSubtasksLoading(false)
        }
    }

    const ListItem = ({ dataItem }) => {

        const handleClick = (dataItem) => {
            setPreviewVisible(true)
            setPreviewItem(dataItem)
            retrieveData(dataItem.id)
        }

        const daysUntilDeadline = (deadline) => {
            const today = new Date()
            const taskDate = new Date(deadline)
            return Math.round((taskDate - today) / 86400000) + 1
        }

        return (
            <li className='listItem' onClick={() => handleClick(dataItem)}>
                <div>{dataItem.title}</div>
                <div className='itemDeadline'>
                    {dataItem.deadline} ({daysUntilDeadline(dataItem.deadline)} days left)
                </div>
            </li>
        )
    }

    const Subtasks = () => {

        const handleSubtaskCheckoff = async (subtaskId) => {
            await subtaskService.checkOffSubtask(subtaskId)
            retrieveData(previewItem.id)
        }

        return (
            <div className='subtasksContainer'>
                {subtasksLoading ? (
                    <div>Loading subtasks...</div>
                ) : (
                    previewSubtasks.length > 0 && previewSubtasks.map((subtask) => (
                        <div className='subtaskItem'>
                            <button
                                className={`${subtask.status === 'open' ? 'subtaskButton' : 'subtaskButtonDone'}`}
                                disabled={subtask.status !== 'open'}
                                title='Mark subtask as done'
                                onClick={() => handleSubtaskCheckoff(subtask.id)}
                            >
                                <IconContext value={{size: '1em'}}>
                                    <IoCheckmarkSharp/>
                                </IconContext>
                            </button>
                            <div className={`${subtask.status === 'open' ? '' : 'crossedOut'}`}>
                                {subtask.description}
                            </div>
                        </div>
                    ))
                )}
            </div>
        )
    }

    const close = () => {
        setPreviewVisible(false);
    }

    const edit = () => {
        setIsEditOverlayOpen(!isEditOverlayOpen);
    }

    const addSubtask = () => {
        setIsSubtaskOverlayOpen(!isSubtaskOverlayOpen)
    }

    const handleCheckOff = async () => {
        try {
            await checkOffTask(previewItem.id, {
                status: "done",
                creationDate: previewItem.creationDate,
                title: previewItem.title,
                category: previewItem.category,
                deadline: previewItem.deadline,
                notes: previewItem.notes
            });
        } catch(error) {
            console.error("Error updating task: ", error)
        }
        setPreviewVisible(false);
    }

    const handleDelete = async () => {
        try {
            await deleteTask(previewItem.id)
        } catch (error) {
            console.error("Error deleting task: ", error)
        }
    }

    const filter = (e) => {
        setIsProcessing(true)
        setSorting('')
        if (e.target.value === 'Select category filter...') {
            setCategoryFilter('')
            setListedData(data)
            setFilterActive(false)
        } else {
            setCategoryFilter(e.target.value)
            setListedData(data.filter((item) => item.category === e.target.value))
            setFilterActive(true)
        }
        // if (sortActive) {
        //     sortData()
        // }
        setIsProcessing(false)
    }

    const sort = (e) => {
        setIsProcessing(true)
        if (e.target.value === 'Sort by...') {
            setSorting('')
            // setSortActive(false)
        } else {
            setSorting(e.target.value)
            // setSortActive(true)
            if (e.target.value === 'Deadline') {
                setListedData(listedData.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)))
            } else {
                setListedData(listedData.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate)))
            }
        }
        setIsProcessing(false)
    }

    // const sortData = () => {
    //     if (sorting === 'Deadline') {
    //         setListedData(listedData.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)))
    //     } else {
    //         setListedData(listedData.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate)))
    //     }
    // }

    useEffect(() => {
        setListedData(data)
        setSorting('')
        if (filterActive) {
            setListedData(data.filter((item) => item.category === categoryFilter))
        }
        // if (sortActive) {
        //     sortData()
        // }
    }, [data]);

    if (data.length === 0) return (
        <div className='listContainer'>
            <p className='listTitle'>List of tasks</p>
            <div>No open tasks. Good job!</div>
        </div>
    )

    return (
        <div className='listContainer'>
            <div className='selectContainer'>
                <select
                    className='topSelect'
                    id='sorting'
                    value={sorting}
                    onChange={sort}
                >
                    <option>Sort by...</option>
                    <option>Creation date</option>
                    <option>Deadline</option>
                </select>
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
            <p className='listTitle'>List of tasks</p>
            <div className='listContent'>
                <div className='listItemsContainer'>
                    {isProcessing ? (
                        <div className='alternatives'>Processing...</div>
                    ) : (
                        listedData.length > 0 ? (
                            listedData.map((item, index) => (
                                <ListItem key={index} dataItem={item}/>
                            ))
                        ) : (
                            <div className='alternatives'>No matches found</div>
                        )
                    )}
                </div>
                <div className={`previewContainer ${previewVisible ? 'visible' : 'hidden'}`}>
                    <p className='previewTitle'>{previewItem.title}</p>
                    <div className='preview'>
                        <div style={{ fontWeight: 'bold'}}>Category:</div>
                        <div>{previewItem.category}</div>
                    </div>
                    <div className='preview'>
                        <div style={{ fontWeight: 'bold'}}>Deadline:</div>
                        <div>{previewItem.deadline}</div>
                    </div>
                    {previewItem.notes !== '' &&
                        <div className='preview'>
                            <div style={{ fontWeight: 'bold'}}>Notes:</div>
                            <div>{previewItem.notes}</div>
                        </div>
                    }
                        <div>
                            <div className='preview centered'>
                                <div style={{fontWeight: 'bold'}}>Subtasks:</div>
                                <button
                                    className='plusButton'
                                    title='Add subtask'
                                    onClick={addSubtask}
                                >
                                    <IconContext value={{size: '1.2em'}}>
                                        <IoAddCircleOutline/>
                                    </IconContext>
                                </button>
                            </div>
                            <Subtasks taskId={previewItem.id} />
                        </div>
                    <div className='buttonContainer'>
                        <button
                            className='actionButton'
                            title='Edit task'
                            onClick={edit}
                        >
                            <IconContext value={{size: '1.5em'}}>
                                <IoCreateOutline/>
                            </IconContext>
                        </button>
                        <button
                            className='actionButton'
                            title='Mark task as done'
                            onClick={handleCheckOff}
                        >
                            <IconContext value={{size: '1.5em'}}>
                                <IoCheckmarkCircleOutline/>
                            </IconContext>
                        </button>
                        <button
                            className='actionButton'
                            title='Delete task'
                            onClick={handleDelete}
                        >
                            <IconContext value={{size: '1.5em'}}>
                                <IoTrashOutline/>
                            </IconContext>
                        </button>
                        <button
                            className='actionButton'
                            title='Close preview'
                            onClick={close}
                        >
                            <IconContext value={{size: '1.5em'}}>
                                <IoCloseCircleOutline/>
                            </IconContext>
                        </button>
                    </div>
                    <EditOverlay
                        item={previewItem}
                        action={() => setPreviewVisible(false)}
                        isOverlayOpen={isEditOverlayOpen}
                        setIsOverlayOpen={setIsEditOverlayOpen}
                    />
                    <SubtaskOverlay
                        taskId={previewItem.id}
                        isOverlayOpen={isSubtaskOverlayOpen}
                        setIsOverlayOpen={setIsSubtaskOverlayOpen}
                        setSubtasks={setPreviewSubtasks}
                    />
                </div>
            </div>
        </div>
    )
}