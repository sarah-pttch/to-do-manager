import '../styles/List.css'

const ListItem = ({ title, deadline }) => {
    return (
        <li className='listItem'>
            <div>{title}</div>
            <div className='itemDeadline'>{deadline}</div>
        </li>
    )
}

export default function List({ data }) {

    if (data.length === 0) return (
        <div className='listContainer'>
            <p className='listTitle'>List of ToDos</p>
            <div>No ToDos. Good job!</div>
        </div>
    )

    return (
        <div className='listContainer'>
            <p className='listTitle'>List of ToDos</p>
            <ul>
                {data.map((item) => (
                    <ListItem title={item.title} deadline={item.deadline}/>
                ))}
            </ul>
        </div>
    )
}