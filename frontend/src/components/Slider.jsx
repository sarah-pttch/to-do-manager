import '../styles/Slider.css'
import { useEffect, useState } from "react"
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5"
import { IconContext } from "react-icons"
import { useWindowWidth } from "../hooks/useWindowWidth"

export default function Slider({ data, setSelectedTask, openDetails }) {

    const width = useWindowWidth()
    const [slideNumber, setSlideNumber] = useState(3)
    const [currentSlide, setCurrentSlide] = useState([0, 1, 2])
    const [filteredData, setFilteredData] = useState([])

    const daysUntilDeadline = (deadline) => {
        const today = new Date();
        const taskDate = new Date(deadline);
        return Math.round((taskDate - today) / 86400000) + 1;
    }

    const deadlineSoon = (deadline) => {
        const difference = daysUntilDeadline(deadline);
        return difference < 7;
    }

    const handleBack = () => {
        setCurrentSlide(currentSlide.map((index) => index - slideNumber))
    }

    const handleForward = () => {
        setCurrentSlide(currentSlide.map((index) => index + slideNumber))
    }

    useEffect(() => {
        setFilteredData(data.filter(item => item && deadlineSoon(item.deadline)))
    }, [data]);

    useEffect(() => {
        if (width < 660) {
            setCurrentSlide([currentSlide[0]])
            setSlideNumber(1)
        } else if (width < 950) {
            setCurrentSlide([currentSlide[0], currentSlide[0] + 1])
            setSlideNumber(2)
        } else {
            setCurrentSlide([currentSlide[0], currentSlide[0] + 1, currentSlide[0] + 2])
            setSlideNumber(3)
        }
    }, [width]);

    const Slide = ({ index, dataItem, days }) => {

        return (
            <div className={`slideContainer ${currentSlide.includes(index) ? 'visible' : 'hidden'}`}>
                <p className='slideTitle'>{dataItem.title}</p>
                { days === 1
                    ? <p>Deadline in {days} day</p>
                    : <p className={days < 0 ? 'red' : undefined}>Deadline in {days} days</p>
                }
            </div>
        )
    }

    return (
        <div className='sliderContainer'>
            <p className='sliderTitle'>Deadline is close...</p>
            <div className='innerSliderContainer'>
                <IconContext value={{size: '1.5em'}}>
                    <button className={`${currentSlide.includes(0) ? 'disabled' : ''}`} onClick={handleBack} disabled={currentSlide.includes(0)}>
                        <IoArrowBackCircle />
                    </button>
                </IconContext>
                <div className='sliderContent'>
                    {data.filter(item => item && deadlineSoon(item.deadline))
                        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                        .map((item, index) => (
                            <Slide
                                key={index}
                                index={index}
                                dataItem={item}
                                days={daysUntilDeadline(item.deadline)}
                            />
                    ))}
                </div>
                <IconContext value={{size: '1.5em'}}>
                    <button className={`${filteredData.length === 0 || currentSlide.includes(filteredData.length - 1) ? 'disabled' : ''}`} onClick={handleForward} disabled={filteredData.length === 0 || currentSlide.includes(filteredData.length - 1)}>
                        <IoArrowForwardCircle />
                    </button>
                </IconContext>
            </div>
        </div>
    )
}