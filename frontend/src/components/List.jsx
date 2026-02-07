import "../styles/List.css"
import {useEffect, useState} from "react"
import { useCategoryStore } from "../stores/categoryStore.jsx"

export default function List({ data, setSelectedTask, openDetails }) {

    const [listedData, setListedData] = useState([])
    const [filterActive, setFilterActive] = useState(false)
    const [categoryFilter, setCategoryFilter] = useState('')
    const [sorting, setSorting] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const categories = useCategoryStore((state) => state.categories)

    const ListItem = ({ dataItem }) => {

        const handleClick = (dataItem) => {
            setSelectedTask(dataItem.id)
            openDetails(true)
        }

        const daysUntilDeadline = (deadline) => {
            const today = new Date()
            const taskDate = new Date(deadline)
            return Math.round((taskDate - today) / 86400000) + 1
        }

        return (
            <li className='listItem' onClick={() => handleClick(dataItem)}>
                <div className='listItemComponent'>{dataItem.title}</div>
                <div className='listItemComponent itemDeadline'>
                    {dataItem.deadline} ({daysUntilDeadline(dataItem.deadline)} days left)
                </div>
            </li>
        )
    }

    const filter = (e) => {
        setIsProcessing(true)
        setSorting('')
        if (e.target.value === 'Select category filter...') {
            setCategoryFilter('')
            setListedData(data)
            setFilterActive(false)
        } else {
            setCategoryFilter(e.target.value)
            setListedData(data.filter((item) => item.category === e.target.value))
            setFilterActive(true)
        }
        setIsProcessing(false)
    }

    const sort = (e) => {
        setIsProcessing(true)
        if (e.target.value === 'Sort by...') {
            setSorting('')
        } else {
            setSorting(e.target.value)
            if (e.target.value === 'Deadline') {
                setListedData(listedData.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)))
            } else {
                setListedData(listedData.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate)))
            }
        }
        setIsProcessing(false)
    }

    useEffect(() => {
        setListedData(data)
        setSorting('')
        if (filterActive) {
            setListedData(data.filter((item) => item.category === categoryFilter))
        }
    }, [data]);

    if (data.length === 0) return (
        <div className='listContainer'>
            <p className='listTitle'>List of tasks</p>
            <div>No open tasks. Good job!</div>
        </div>
    )

    return (
        <div className='listContainer'>
            <div className='selectContainer'>
                <select
                    className='topSelect'
                    id='sorting'
                    value={sorting}
                    onChange={sort}
                >
                    <option>Sort by...</option>
                    <option>Creation date</option>
                    <option>Deadline</option>
                </select>
                <select
                    className='topSelect'
                    id='categoryFilter'
                    value={categoryFilter}
                    onChange={filter}
                >
                    <option>Select category filter...</option>
                    {categories.map((item) => (
                        <option key={item.id} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>
            <p className='listTitle'>List of Tasks</p>
            <div className='listContent'>
                <div className='listItemsContainer'>
                    {isProcessing ? (
                        <div className='alternatives'>Processing...</div>
                    ) : (
                        listedData.length > 0 ? (
                            listedData.map((item, index) => (
                                <ListItem key={index} dataItem={item}/>
                            ))
                        ) : (
                            <div className='alternatives'>No matches found</div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}