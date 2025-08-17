import { useState } from 'react'
import './App.css'
import Navigation from './components/Navigation.jsx'
import Overlay from './components/Overlay.jsx'
import Slider from './components/Slider.jsx'
import List from './components/List.jsx'
import { toDoService } from './services/api.jsx'

function App() {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [deadline, setDeadline] = useState('')

    const handleSubmit = async () => {
        try {
            await toDoService.create({title, category, deadline})
            setTitle('')
            setCategory('')
            setDeadline('')
            setIsOverlayOpen(!isOverlayOpen)
            alert("ToDo created successfully")
        } catch(error) {
            alert("Error creating ToDo: " + error)
        }
    }

  return (
    <>
        <Navigation />
        <button onClick={() => setIsOverlayOpen(!isOverlayOpen)}>Open Overlay</button>
        <Overlay
            isOpen={isOverlayOpen}
            overlayTitle={'Create a new ToDo'}
            buttonTitle={'Close'}
            onClose={() => {setIsOverlayOpen(!isOverlayOpen)}}
            onSave={handleSubmit}
        >
            <label>Title: </label>
            <input id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label>Category: </label>
            <input id='category' type='text' value={category} onChange={(e) => setCategory(e.target.value)}/>
            <label>Deadline: </label>
            <input id='deadline' type='date' value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
        </Overlay>
        <Slider></Slider>
        <List></List>
    </>
  )
}

export default App
