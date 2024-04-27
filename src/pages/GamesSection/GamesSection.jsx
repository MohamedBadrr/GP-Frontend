import React from 'react';
import "./GamesSection.css";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import img1 from "../../assets/images/game1.png" 
import img2 from "../../assets/images/game2.png"
import { Link } from 'react-router-dom';

const GamesSection = () => {

    const options = {
        items:1,
        loop:true,
        autoplay:true,
        autoplayTimeout:4000,
        nav:true,
        dots:true,
        margin:15,
        responsive:{
            1100:{
                items: 2,
            },
            724:{
                items: 1,
            },
            500:{
                items:1,
            }
        }
    }


return (
    <>
    <div className="games">
        <div className='container'>
            <div className='row'>
                <div className='col-md-4 offset-1 games-text'>
                    <h1><span className='edit'>L</span>et<span className='edit'>'s</span></h1>
                    <h1><span className='edit'>P</span>la<span className='edit'>y </span>
                <span className='edit'>N</span>o<span className='edit'>w</span></h1>
                    <button className='d-button'><Link className='text-decoration-none text-white'  to={"/mainamenu"}>Start Now</Link></button>
                </div>
                <div className='col-md-7'>
                <OwlCarousel className='owl-theme' {...options}>
                    <div class='item text-center' >
                        <h4 className='my-3'><span className='edit'>Plane</span> Game</h4>
                        
                        <img src={img1} style={{"height":"370px"}} alt="" />
                        <div className='gameskin'><a href={"/mainamenu"}><i class="fa-solid fa-circle-play fa-5x"></i></a></div>
                    </div>
                    <div class='item text-center'>
                    <h4 className='my-3'><span className='edit'>Rock </span>Paper <span className='edit'>Siser</span> Game</h4>
                        <img src={img2} style={{"height":"370px"}} alt="" />
                        <div className='gameskin'><a href={"/RPS-Game"}><i class="fa-solid fa-circle-play fa-5x " ></i></a></div>
                    </div>
                    <div class='item text-center'>
                    <h4 className='my-3'><span className='edit'>Plane</span> Game</h4>
                    <img src={img1} style={{"height":"370px"}} alt=""/>
                    <div className='gameskin'><a href={"/mainamenu"}><i class="fa-solid fa-circle-play fa-5x"></i></a></div>
                    </div>
                    <div class='item text-center'>
                    <h4 className='my-3'><span className='edit'>Rock </span>Paper <span className='edit'>Siser</span> Game</h4>
                    <img src={img2} style={{"height":"370px"}}alt="" />
                    <div className='gameskin'><a href={"/RPS-Game"}><i class="fa-solid fa-circle-play fa-5x " ></i></a></div>
                    </div>
                </OwlCarousel>
                </div>
            </div>
        </div>
    </div>
    
    </>
);
}

export default GamesSection;
