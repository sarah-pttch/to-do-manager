import Slider from '../components/Slider.jsx'
import List from '../components/List.jsx'
import CreateOverlay from "../components/CreateOverlay.jsx";
import { useEffect, useState } from "react";
import { toDoService } from "../services/api.jsx";

export default function Overview() {

    const [toDos, setToDos] = useState([]);
    const retrieveData = async () => {
        const data = await toDoService.getAll();
        setToDos(data.data)
    }

    useEffect(() => {
        retrieveData();
    }, []);

    return (
        <>
            <CreateOverlay onAdd={retrieveData} />
            <Slider data={toDos} />
            <List data={toDos} onUpdate={retrieveData} />
        </>
    )
}