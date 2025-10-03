import "../styles/List.css"
import { useState} from "react"
import EditOverlay from "./EditOverlay.jsx"
import { taskService } from "../services/taskApi.jsx"
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoCreateOutline, IoAddCircleOutline } from "react-icons/io5"
import { IconContext } from "react-icons"
import SubtaskOverlay from "./SubtaskOverlay.jsx"
import {subtaskService} from "../services/subtaskApi.jsx"

export default function List({ data, onUpdate, categories }) {

    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewItem, setPreviewItem] = useState([])
    const [previewSubtasks, setPreviewSubtasks] = useState([])
    const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false)
    const [isSubtaskOverlayOpen, setIsSubtaskOverlayOpen] = useState(false)
    const [subtasksLoading, setSubtasksLoading] = useState(false)

    const retrieveData = async (taskId) => {
        setSubtasksLoading(true)
        console.log(taskId)
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
            setPreviewVisible(true);
            setPreviewItem(dataItem);
            retrieveData(dataItem.id)
            // setPreviewSubtasks(dataItem.subtasks);
        }

        const daysUntilDeadline = (deadline) => {
            const today = new Date();
            const taskDate = new Date(deadline);
            return Math.round((taskDate - today) / 86400000);
        }

        return (
            <li className='listItem' onClick={() => handleClick(dataItem)}>
                <div>{dataItem.title}</div>
                <div className='itemDeadline'>{dataItem.deadline} ({daysUntilDeadline(dataItem.deadline)} days left)</div>
            </li>
        )
    }

    const Subtasks = () => {

        return (
            <div className='subtasksContainer'>
                {subtasksLoading ? (
                    <div>Loading subtasks...</div>
                ) : (
                    previewSubtasks.length > 0 && previewSubtasks.map((subtask) => (
                        <div>
                            <input key={subtask.id} type='checkbox'/>
                            {subtask.description}
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
            await taskService.update(previewItem.id, {
                status: "done",
                creationDate: previewItem.creationDate,
                title: previewItem.title,
                category: previewItem.category,
                deadline: previewItem.deadline,
                notes: previewItem.notes
            });
        } catch(error) {
            alert("Error updating task: " + error)
        }
        setPreviewVisible(false);
        onUpdate();
    }

    if (data.length === 0) return (
        <div className='listContainer'>
            <p className='listTitle'>List of tasks</p>
            <div>No open tasks. Good job!</div>
        </div>
    )

    return (
        <div className='listContainer'>
            <p className='listTitle'>List of tasks</p>
            <div className='listContent'>
                <div className='listItemsContainer'>
                    {data.map((item, index) => (
                        <ListItem key={index} dataItem={item}/>
                    ))}
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
                                <button className='plusButton' title='Add subtask' onClick={addSubtask}>
                                    <IconContext value={{size: '1.2em'}}>
                                        <IoAddCircleOutline/>
                                    </IconContext>
                                </button>
                            </div>
                            <Subtasks taskId={previewItem.id} />
                        </div>
                    <div className='buttonContainer'>
                        <button className='actionButton' title='Edit task' onClick={edit}>
                            <IconContext value={{size: '1.5em'}}>
                                <IoCreateOutline/>
                            </IconContext>
                        </button>
                        <button className='actionButton' title='Mark task as done' onClick={handleCheckOff}>
                            <IconContext value={{size: '1.5em'}}>
                                <IoCheckmarkCircleOutline/>
                            </IconContext>
                        </button>
                        <button className='actionButton' title='Close preview' onClick={close}>
                            <IconContext value={{size: '1.5em'}}>
                                <IoCloseCircleOutline/>
                            </IconContext>
                        </button>
                    </div>
                    <EditOverlay item={previewItem} closePreview={setPreviewVisible} isOverlayOpen={isEditOverlayOpen}
                                 setIsOverlayOpen={setIsEditOverlayOpen} onUpdate={onUpdate} categories={categories}/>
                    <SubtaskOverlay taskId={previewItem.id} isOverlayOpen={isSubtaskOverlayOpen} setIsOverlayOpen={setIsSubtaskOverlayOpen} setSubtasks={setPreviewSubtasks}/>
                </div>
            </div>
        </div>
    )
}