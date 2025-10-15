// import './App.css'
import Navigation from './components/Navigation.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Overview from "./routes/Overview.jsx"
import Settings from "./routes/Settings.jsx"
import Calendar from "./routes/Calendar.jsx"
import Archive from "./routes/Archive.jsx"
import Longterm from "./routes/Longterm.jsx"
import Statistics from "./routes/Statistics.jsx"

function App() {

  return (
    <BrowserRouter>
        <Navigation />
        <Routes>
            <Route path="/" element={<Overview />} />
            {/*<Route path="/calendar" element={<Calendar />} />*/}
            <Route path="/longterm" element={<Longterm />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
