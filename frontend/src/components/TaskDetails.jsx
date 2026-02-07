import "../styles/TaskDetails.css"
import { IconContext } from "react-icons"
import {
    IoAddCircleOutline,
    IoAlarmOutline,
    IoCheckmarkCircleOutline, IoCheckmarkSharp,
    IoCloseCircleOutline,
    IoCreateOutline,
    IoTrashOutline
} from "react-icons/io5"
import EditOverlay from "./EditOverlay"
import SubtaskOverlay from "./SubtaskOverlay"
import ReminderOverlay from "./ReminderOverlay"
import { useEffect, useState } from "react"
import { useTaskStore } from "../stores/taskStore"
import { subtaskService } from "../services/subtaskApi"

export default function TaskDetails({ taskId, visible, setVisible }) {

    const [task, setTask] = useState([])
    const [previewSubtasks, setPreviewSubtasks] = useState([])
    const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false)
    const [isSubtaskOverlayOpen, setIsSubtaskOverlayOpen] = useState(false)
    const [isReminderOverlayOpen, setIsReminderOverlayOpen] = useState(false)
    const [subtasksLoading, setSubtasksLoading] = useState(false)
    const checkOffTask = useTaskStore((state) => state.checkOffTask)
    const deleteTask = useTaskStore((state) => state.deleteTask)
    const tasks = useTaskStore((state) => state.tasks)

    const updateTask = async () => {
        await setTask(tasks.find((task) => task.id === taskId))
    }

    const retrieveData = async (taskId) => {
        setSubtasksLoading(true)
        try {
            const subtasksData = await subtaskService.getAllByTaskId(taskId)
            setPreviewSubtasks(subtasksData.data)
        } catch (error) {
            console.error("Error retrieving subtasks", error)
        } finally {
            setSubtasksLoading(false)
        }
    }

    const Subtasks = () => {

        const handleSubtaskCheckoff = async (subtaskId) => {
            await subtaskService.checkOffSubtask(subtaskId)
            await retrieveData(taskId) //necessary??
        }

        return (
            <div className='subtasksContainer'>
                {subtasksLoading ? (
                    <div>Loading subtasks...</div>
                ) : (
                    previewSubtasks.length > 0 && previewSubtasks.map((subtask) => (
                        <div key={subtask.id} className='subtaskItem'>
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
        setVisible(false);
    }

    const edit = () => {
        setIsEditOverlayOpen(!isEditOverlayOpen);
    }

    const setReminder = () => {
        setIsReminderOverlayOpen(!isReminderOverlayOpen)
    }

    const addSubtask = () => {
        setIsSubtaskOverlayOpen(!isSubtaskOverlayOpen)
    }

    const handleCheckOff = async () => {
        try {
            await checkOffTask(task.id, {
                status: "done",
                creationDate: task.creationDate,
                title: task.title,
                category: task.category,
                deadline: task.deadline,
                notes: task.notes
            });
        } catch(error) {
            console.error("Error updating task: ", error)
        }
        setVisible(false);
    }

    const handleDelete = async () => {
        try {
            await deleteTask(task.id)
        } catch (error) {
            console.error("Error deleting task: ", error)
        }
    }

    useEffect(() => {
        if (taskId !== -1) {
            updateTask()
            retrieveData(taskId)
        }
    }, [taskId]);

    useEffect(() => {
        if (taskId !== -1) {
            updateTask()
        }
    }, [tasks]);

    return (
        <div className={`detailsContainer ${visible ? 'visible' : 'hidden'}`}>
            <p className='detailsTitle'>Task Details</p>
            <div className='detailsContent'>
                <p className='taskTitle'>{task.title}</p>
                <div className='detail'>
                    <div style={{fontWeight: 'bold'}}>Category:</div>
                    <div>{task.category}</div>
                </div>
                <div className='detail'>
                    <div style={{fontWeight: 'bold'}}>Deadline:</div>
                    <div>{task.deadline}</div>
                </div>
                {task.notes !== '' &&
                    <div className='detail'>
                        <div style={{fontWeight: 'bold'}}>Notes:</div>
                        <div>{task.notes}</div>
                    </div>
                }
                <div>
                    <div className='detail centered'>
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
                    <Subtasks taskId={task.id}/>
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
                        title='Set reminder'
                        onClick={setReminder}
                    >
                        <IconContext value={{size: '1.5em'}}>
                            <IoAlarmOutline/>
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
                        title='Close task details'
                        onClick={close}
                    >
                        <IconContext value={{size: '1.5em'}}>
                            <IoCloseCircleOutline/>
                        </IconContext>
                    </button>
                </div>
                <EditOverlay
                    item={task}
                    isOverlayOpen={isEditOverlayOpen}
                    setIsOverlayOpen={setIsEditOverlayOpen}
                />
                <SubtaskOverlay
                    taskId={task.id}
                    isOverlayOpen={isSubtaskOverlayOpen}
                    setIsOverlayOpen={setIsSubtaskOverlayOpen}
                    setSubtasks={setPreviewSubtasks}
                />
                <ReminderOverlay
                    item={task}
                    isOverlayOpen={isReminderOverlayOpen}
                    setIsOverlayOpen={setIsReminderOverlayOpen}
                />
            </div>
        </div>
    )
}