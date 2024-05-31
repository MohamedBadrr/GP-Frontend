import React from 'react'
import "./aboutus.css"
import mohamed from "../../assets/images/mohamedbadr.jpg"
import zizo from "../../assets/images/zizo.jpg"
import abdo from "../../assets/images/abdopg.jpg"
import ziko from "../../assets/images/ziko.jpg"
import adel from "../../assets/images/mohamedadel.jpg"
import taha from "../../assets/images/taha.jpg"

const AboutUs = () => {
    return (
        <div className='our-team'>
                <div className='title-team'>
                    <h1>
                        our team
                    </h1>
                    <p>
                        Students at Computer Science and Artificial Intelligence Helwan University.
                        Experienced with all stages of the development cycle for dynamic web projects.
                        Good in HTML5, CSS, JavaScript, and understanding of React fundamentals and
                        node.js.
                    </p>
                </div>
                <div className='card-all-team'>
                    <div className='card-team'>
                        <img src={zizo} alt='elqaed' />
                    </div>
                    <div className='card-team'>
                        <img src={abdo} alt='abdo' />
                    </div>
                    <div className='card-team'>
                        <img src={mohamed} alt='badr' />
                    </div>
                    <div className='card-team'>
                        <img src={adel} alt='adel' />
                    </div>
                    <div className='card-team'>
                        <img src={ziko} alt='taha' />
                    </div>
                    <div className='card-team'>
                        <img src={taha} alt='adel' />
                    </div>
                </div>
            </div>
    )
}

export default AboutUs