import React from 'react';
import { Link } from 'react-router-dom';
import icon1 from './../../img/home/icon/double-arrow.png'
import "./Home.css"
export default function Home() {
  return (
    <>
      <div>
        <button className="btn btn-info">
          <Link to={"/selectskin"}>Select Skin</Link>
        </button>
      </div>
    </>
  );
}
