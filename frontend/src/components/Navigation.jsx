import '../styles/Navigation.css'

export default function Navigation() {

    return (
        <div className='navigation' style={{display: 'flex', flexDirection: 'row'}}>
            <button className='navButton'>Overview</button>
            <button className='navButton'>Calendar</button>
            <button className='navButton'>Settings</button>
            <button className='navButton logout'>Logout</button>
        </div>
    )
}