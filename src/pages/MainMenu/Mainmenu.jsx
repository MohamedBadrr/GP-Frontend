import React from 'react'
import "./Mainmenu.css"
import { Link } from 'react-router-dom'
import plane from "../../assets/images/pngwing.png"
import astu from  "../../assets/images/Asturant.png"
import video from "../../assets/video/bgvid.mp4"

const Mainmenu = () => {
    return (
        <div className="MainMenu">
            <div className="video-background">
                <video autoPlay loop muted playsInline>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
            <div className="Main-all row">
                <div className="asturant col-md-6">
                    <img src={astu} />
                </div>
                <div className="main col-md-6">
                <h1 className='mt-5'>the posibilities<br/> beyond your imagination</h1>
                    {/* <Link className='text-decoration-none text-white' to={"/selectskin"}><button className='c-button'>Select skin</button></Link>
                    <Link className='text-decoration-none text-white' to={"/buyskin"}><button className='c-button'>buy skin</button></Link>
                    <Link className='text-decoration-none text-white' to={"/home"}><button className='c-button'>quit</button></Link> */}
                    <Link className='list-skin mt-5' to={"/selectskin"}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Select Plane
                    </Link>
                    <Link className='list-skin' to={"/buyskin"}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Buy New Planes
                    </Link>
                    <Link className='list-skin' to={"/home"}>
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