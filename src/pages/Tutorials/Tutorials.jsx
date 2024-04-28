import React from 'react';
import "./Tutorials.css"
import { Link } from 'react-router-dom';


    const Tutorials = () => {
    return (
        <>
        <div className='about d-flex justify-content-around align-items-start'>
            <div className='container' >
                <div className='row '>
                    <h1 className='mt-4 text-center title-tutorail'>Some Tutorials About our Games</h1>
                </div>
                        <div className='videos '>
                        <div className='video1'>
                            <div className='vedio1-skin'>
                                <button className='d-button p-3'><Link to={"https://www.youtube.com/watch?v=75KSKu9ShV0"}>Watch Tutorial</Link></button>
                            </div>
                        </div>
                        <div className='video2'>
                        <div className='vedio2-skin'>
                        <button className='d-button p-3'><Link to={"https://www.youtube.com/watch?v=75KSKu9ShV0"}>Watch Tutorial</Link></button>
                            </div>
                        </div>
                </div>
                    
                </div>
            </div>
        </>
    );
    }

    export default Tutorials;
