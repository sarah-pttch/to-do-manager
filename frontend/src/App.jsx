import './App.css'
import Navigation from './components/Navigation.jsx'
import Slider from './components/Slider.jsx'
import List from './components/List.jsx'
import CreateOverlay from "./components/CreateOverlay.jsx";
import {useEffect, useState} from "react";
import { toDoService } from "./services/api.jsx";

function App() {

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
        <Navigation />
        <CreateOverlay onAdd={retrieveData}/>
        <Slider data={toDos}></Slider>
        <List data={toDos} onUpdate={retrieveData}/>
    </>
  )
}

export default App
