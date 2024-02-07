import React from "react";
import { Link } from "react-router-dom";
import "./css/select-skin.css" ;
import plane1 from "./../../../img/skin1.png" ;
import plane2 from "./../../../img/skin2.png" ;
import plane5 from "./../../../img/skin5.png" ;
export default function SelectSkin() {
  return (
    <section className="skin-section">
      <h1>Select Your skin</h1>
      <div className="cards-container">
        <div className="skin-card">
          <Link to={"/game?id=0"}>
            <h4>Space Lord</h4>
            <img alt="plane1" src={plane1} />
          </Link>
        </div>
        <div className="skin-card">
          <Link to={"/game?id=1"}>
            <h4>Ghost</h4>
            <img alt="plane1" src={plane2} />
          </Link>
        </div>
        <div className="skin-card">
          <Link to={"/game?id=2"}>
            <h4>Retro</h4>
            <img alt="plane1" src={plane5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
