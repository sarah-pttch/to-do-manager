import '../styles/Slider.css'
import { useEffect, useState } from "react"
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5"
import { IconContext } from "react-icons";

export default function Slider({ data }) {

    const [currentSlide, setCurrentSlide] = useState([0, 1, 2])
    const [filteredData, setFilteredData] = useState([])

    const daysUntilDeadline = (deadline) => {
        const today = new Date();
        const taskDate = new Date(deadline);
        return (taskDate - today) / 86400000;
    }

    const deadlineSoon = (deadline) => {
        const difference = daysUntilDeadline(deadline);
        return difference < 7;
    }

    const handleBack = () => {
        setCurrentSlide(currentSlide.map((index) => index - 3))
    }

    const handleForward = () => {
        setCurrentSlide(currentSlide.map((index) => index + 3))
    }

    useEffect(() => {
        setFilteredData(data.filter(item => item && deadlineSoon(item.deadline)))
    }, [data]);

    const Slide = ({ index, dataItem, days }) => {

        let nrDays = Math.round(days);

        return (
            <div className={`slideContainer ${currentSlide.includes(index) ? 'visible' : 'hidden'}`}>
                <p className='slideTitle'>{dataItem.title}</p>
                { nrDays === 1
                    ? <p>Deadline in {nrDays} day</p>
                    : <p className={nrDays < 0 ? 'red' : undefined}>Deadline in {nrDays} days</p>
                }
            </div>
        )
    }

    return (
        <div className='sliderContainer'>
            <p className='sliderTitle'>Deadline ending soon</p>
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
                    <button className={`${currentSlide.includes(filteredData.length - 1) ? 'disabled' : ''}`} onClick={handleForward} disabled={currentSlide.includes(filteredData.length - 1)}>
                        <IoArrowForwardCircle />
                    </button>
                </IconContext>
            </div>
        </div>
    )
}