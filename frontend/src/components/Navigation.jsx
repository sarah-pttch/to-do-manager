import '../styles/Navigation.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

    const toSettings = () => {
        setActivePage(2);
        navigate('/settings');
    }

    return (
        <div className='navigation' style={{display: 'flex', flexDirection: 'row'}}>
            <button className={`navButton ${activePage === 0 ? 'active' : ''}`} onClick={toOverview}>Overview</button>
            <button className={`navButton ${activePage === 1 ? 'active' : ''}`} onClick={toCalendar}>Calendar</button>
            <button className={`navButton ${activePage === 2 ? 'active' : ''}`} onClick={toSettings}>Settings</button>
            <button className='navButton logout'>Logout</button>
        </div>
    )
}