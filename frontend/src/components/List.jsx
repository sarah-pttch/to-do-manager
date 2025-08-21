import '../styles/List.css'
import {useState} from "react";
import EditOverlay from "./EditOverlay.jsx";

export default function List({ data, onUpdate }) {

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewItem, setPreviewItem] = useState([]);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const ListItem = ({ dataItem }) => {

        const handleClick = (dataItem) => {
            setPreviewVisible(true);
            setPreviewItem(dataItem);
        }

        return (
            <li className='listItem' onClick={() => handleClick(dataItem)}>
                <div>{dataItem.title}</div>
                <div className='itemDeadline'>{dataItem.deadline}</div>
            </li>
        )
    }

    const close = () => {
        setPreviewVisible(false);
    }

    const edit = () => {
        setIsOverlayOpen(!isOverlayOpen)
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
                    {data.map((item, index) => (
                        <ListItem key={index} dataItem={item}/>
                    ))}
                </div>
                <div className={`previewContainer ${previewVisible ? 'visible' : 'hidden'}`}>
                    <p className='previewTitle'>{previewItem.title}</p>
                    <p className='preview'>Category: {previewItem.category}</p>
                    <p className='preview'>Deadline: {previewItem.deadline}</p>
                    <button className='edit' onClick={edit}>Edit ToDo</button>
                    <button className='close' onClick={close}>X</button>
                    <EditOverlay item={previewItem} closePreview={setPreviewVisible} isOverlayOpen={isOverlayOpen} setIsOverlayOpen={setIsOverlayOpen} onUpdate={onUpdate}/>
                </div>
            </div>
        </div>
    )
}