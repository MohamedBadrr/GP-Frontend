import React from 'react'
import "./Mainmenu.css"
import { Link } from 'react-router-dom'
import asturant from "../../assets/images/Asturant.png"
import video from "../../assets/video/bgvid.mp4"

const Mainmenu = () => {
    return (
        <div className="main-menu">
            <div className="main-menu-video-background">
                <video autoPlay loop muted playsInline>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
            <div className="row">
                <div className="main-menu-asturant col-md-6">
                    <img src={asturant} />
                </div>
                <div className="main-menu-hero col-md-6">
                    <h1>the posibilities<br /> beyond your imagination</h1>
                    <Link className='mt-5 main-menu-buttons first-button' to={"/selectskin"}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Select Plane
                    </Link>
                    <Link className='main-menu-buttons second-button' to={"/buyskin"}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Buy New Planes
                    </Link>
                    <Link className='main-menu-buttons third-button' to={"/home"}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Quit The Game
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Mainmenu