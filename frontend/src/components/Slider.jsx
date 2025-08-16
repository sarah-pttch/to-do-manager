import '../styles/Slider.css'

function Slide() {

    return (
        <div className='slideContainer'>
            First Slide
        </div>
    )
}

export default function Slider() {

    return (
        <div className='sliderContainer'>
            <p className='sliderTitle'>Deadline ending soon</p>
            {/*{ slides.map((item, index) => {*/}
            {/*    */}
            {/*})}*/}
            <Slide />
        </div>
    )
}