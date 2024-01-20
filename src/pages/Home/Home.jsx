import React from 'react';
import { Link } from 'react-router-dom';
import icon1 from './../../img/home/icon/double-arrow.png'
import "./Home.css";
import homeBanner from "../../img/banner_img.png"
import GamesSection from '../GamesSection/GamesSection';
export default function Home() {
  return (
    <>
      <div className='body-home'>
        <div className='home-section'>
            <div className='container-fluid'>
            <div className=' home-section row '>
              <div className='col-md-4 offset-1 home-text'>
                <h1>
                Best Games Of <br/> The Latest
                </h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing <br/>elit,
                  sed do eiusmod tempor incididunt ut labore 
                  et dolore magna aliqua. Quis ipsum
                  </p>
                  <button className='d-button px-5 py-2 mt-3 watch-button'>watch Games</button>
              </div>
              <div className='col-md-6 home-banner '>
                <img src={homeBanner} alt="banner" className='w-100' />
              </div>
            </div>
            </div>
        </div>
      </div>
      <GamesSection />
    </>
  );
}
