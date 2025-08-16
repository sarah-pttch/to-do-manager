import { useState } from 'react'
import './App.css'
import Navigation from './components/Navigation.jsx'
import Overlay from "./components/Overlay.jsx"
import Slider from "./components/Slider.jsx"
import List from "./components/List.jsx"

function App() {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  return (
    <>
        <Navigation />
        <button onClick={() => setIsOverlayOpen(!isOverlayOpen)}>Open Overlay</button>
        <Overlay isOpen={isOverlayOpen} overlayTitle={'Create a new ToDo'} buttonTitle={'Close'} onClose={() => {setIsOverlayOpen(!isOverlayOpen)}}>
            <label>Title: </label>
            <input id='title' type='text' />
            <label>Category: </label>
            <input id='category' type='text' />
            <label>Deadline: </label>
            <input id='deadline' type='date' />
        </Overlay>
        <Slider></Slider>
        <List></List>
    </>
  )
}

export default App
