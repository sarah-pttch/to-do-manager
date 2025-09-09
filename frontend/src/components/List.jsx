import '../styles/List.css'
import { useState } from "react"
import EditOverlay from "./EditOverlay.jsx"
import { toDoService } from "../services/toToApi.jsx"

export default function List({ data, onUpdate, categories }) {

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewItem, setPreviewItem] = useState([]);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const ListItem = ({ dataItem }) => {

        const handleClick = (dataItem) => {
            setPreviewVisible(true);
            setPreviewItem(dataItem);
        }

        const daysUntilDeadline = (deadline) => {
            const today = new Date();
            const toDoDate = new Date(deadline);
            return Math.round((toDoDate - today) / 86400000);
        }

        return (
            <li className='listItem' onClick={() => handleClick(dataItem)}>
                <div>{dataItem.title}</div>
                <div className='itemDeadline'>{dataItem.deadline} ({daysUntilDeadline(dataItem.deadline)} days left)</div>
            </li>
        )
    }

    const close = () => {
        setPreviewVisible(false);
    }

    const edit = () => {
        setIsOverlayOpen(!isOverlayOpen);
    }

    const handleCheckOff = async () => {
        try {
            await toDoService.update(previewItem.id, {status: "done", title: previewItem.title, category: previewItem.category, deadline: previewItem.deadline, notes: previewItem.notes});
        } catch(error) {
            alert("Error updating ToDo: " + error)
        }
        setPreviewVisible(false);
        onUpdate();
    }

    if (data.length === 0) return (
        <div className='listContainer'>
            <p className='listTitle'>List of ToDos</p>
            <div>No ToDos. Good job!</div>
        </div>
    )

    return (
        <div className='listContainer'>
            <p className='listTitle'>List of ToDos</p>
            <div className='listContent'>
                <div className='listItemsContainer'>
                    {data.filter(item => item && item.status === "open")
                        .map((item, index) => (
                        <ListItem key={index} dataItem={item}/>
                    ))}
                </div>
                <div className={`previewContainer ${previewVisible ? 'visible' : 'hidden'}`}>
                    <p className='previewTitle'>{previewItem.title}</p>
                    <p className='preview'>Category: {previewItem.category}</p>
                    <p className='preview'>Deadline: {previewItem.deadline}</p>
                    <p className='preview'>Notes: {previewItem.notes}</p>
                    <div className='buttonContainer'>
                        <button className='edit' onClick={edit}>Edit ToDo</button>
                        <button className='done' onClick={handleCheckOff}>Mark as done</button>
                    </div>
                    <button className='close' onClick={close}>X</button>
                    <EditOverlay item={previewItem} closePreview={setPreviewVisible} isOverlayOpen={isOverlayOpen} setIsOverlayOpen={setIsOverlayOpen} onUpdate={onUpdate} categories={categories}/>
                </div>
            </div>
        </div>
    )
}