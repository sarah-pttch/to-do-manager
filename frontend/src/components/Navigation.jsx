import '../styles/Navigation.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import CreateOverlay from "./CreateOverlay.jsx"
import { useCategoryStore } from "../stores/categoryStore.jsx"

export default function Navigation() {

    const [activePage, setActivePage] = useState(0);
    const navigate = useNavigate();

    const toOverview = () => {
        setActivePage(0);
        navigate('/');
    }

    const toCalendar = () => {
        setActivePage(1);
        navigate('/calendar');
    }

    const toArchive = () => {
        setActivePage(2);
        navigate('/archive');
    }

    const toSettings = () => {
        setActivePage(3);
        navigate('/settings');
    }

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const fetchCategories = useCategoryStore((state) => state.fetchCategories)

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className='navigation' style={{display: 'flex', flexDirection: 'row'}}>
            <button className={`navButton ${activePage === 0 ? 'active' : ''}`} onClick={toOverview}>Overview</button>
            <button className={`navButton ${activePage === 1 ? 'active' : ''}`} onClick={toCalendar}>Calendar</button>
            <button className={`navButton ${activePage === 2 ? 'active' : ''}`} onClick={toArchive}>Archive</button>
            <button className={`navButton ${activePage === 3 ? 'active' : ''}`} onClick={toSettings}>Settings</button>
            <button className='navButton create' onClick={() => setIsOverlayOpen(!isOverlayOpen)}>Create task</button>
            <CreateOverlay isOverlayOpen={isOverlayOpen} setIsOverlayOpen={setIsOverlayOpen}/>
        </div>
    )
}