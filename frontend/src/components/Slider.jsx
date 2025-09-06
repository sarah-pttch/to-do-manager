import '../styles/Slider.css'

function Slide({ dataItem, days }) {

    let nrDays = Math.round(days);

    return (
        <div className='slideContainer'>
            <p className='slideTitle'>{dataItem.title}</p>
            { nrDays === 1
                ? <p>Deadline in {nrDays} day</p>
                : <p className={nrDays < 0 && 'red'}>Deadline in {nrDays} days</p>
            }
        </div>
    )
}

export default function Slider({ data }) {

    const daysUntilDeadline = (deadline) => {
        const today = new Date();
        const toDoDate = new Date(deadline);
        return (toDoDate - today) / 86400000;
    }

    const deadlineSoon = (deadline) => {
        const difference = daysUntilDeadline(deadline);
        return difference < 7;
    }

    return (
        <div className='sliderContainer'>
            <p className='sliderTitle'>Deadline ending soon</p>
            <div className='sliderContent'>
                {data.filter(item => item && item.status === "open" && deadlineSoon(item.deadline))
                    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                    .map((item, index) => (
                        <Slide key={index} dataItem={item} days={daysUntilDeadline(item.deadline)}/>
                ))}
            </div>
        </div>
    )
}