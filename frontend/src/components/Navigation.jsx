import '../styles/Navigation.css'
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import CreateOverlay from "./CreateOverlay"
import { useCategoryStore } from "../stores/categoryStore"
import {useTaskStore} from "../stores/taskStore.jsx";

export default function Navigation() {

    const navigate = useNavigate();
    const location = useLocation();

    const toOverview = () => {
        navigate('/');
    }

    const toLongterm = () => {
        navigate('/longterm')
    }

    const toArchive = () => {
        navigate('/archive');
    }

    const toStatistics = () => {
        navigate('/statistics');
    }

    const toSettings = () => {
        navigate('/settings');
    }

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const fetchTasks = useTaskStore((state) => state.fetchTasks)
    const fetchCategories = useCategoryStore((state) => state.fetchCategories)

    useEffect(() => {
        fetchTasks();
        fetchCategories();
    }, []);

    return (
        <div className='navigation'>
            <button
                className={`navButton ${location.pathname === '/' ? 'active' : ''}`}
                onClick={toOverview}
            >
                Task Overview
            </button>
            <button
                className={`navButton ${location.pathname === '/longterm' ? 'active' : ''}`}
                onClick={toLongterm}
            >
                Longterm Tasks
            </button>
            <button
                className={`navButton ${location.pathname === '/archive' ? 'active' : ''}`}
                onClick={toArchive}
            >
                Archive
            </button>
            <button
                className={`navButton ${location.pathname === '/statistics' ? 'active' : ''}`}
                onClick={toStatistics}
            >
                Statistics
            </button>
            <button
                className={`navButton ${location.pathname === '/settings' ? 'active' : ''}`}
                onClick={toSettings}
            >
                Settings
            </button>
            <button
                className='navButton create'
                onClick={() => setIsOverlayOpen(!isOverlayOpen)}
            >
                Create task
            </button>
            <CreateOverlay isOverlayOpen={isOverlayOpen} setIsOverlayOpen={setIsOverlayOpen}/>
        </div>
    )
}