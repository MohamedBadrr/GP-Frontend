import React from 'react';
import "./Card.css";
import testImage from "../../assets/images/winner.png"

const Card = () => {
  return (
    <div className='all-the-card'>
        <div className='the-card-conatier'>
            <div className='imgbox'>
                <img src={testImage} alt="" className='plane-card-img' />
            <span></span>
            </div>
            {/* <span className='brand'>Plane 1</span> */}
            <div className="title">Title Name</div>
            <div className='buysection'>
                <h2 className='mt-3'><sup>$</sup>500 <span>.99</span></h2>
                <button>Buy Now</button>
                
            </div>
        </div>
    </div>
  );
}

export default Card;
