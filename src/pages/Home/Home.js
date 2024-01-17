import React from 'react';
import { Link } from 'react-router-dom';
import icon1 from './../../img/home/icon/double-arrow.png'
import "./Home.css"
export default function Home() {
  return (
    <>
      {/* <div>
        <button className="btn btn-info">
          <Link to={"/selectskin"}>Select Skin</Link>
        </button>
      </div> */}
      <div>
        <section class="hero-section overflow-hidden">
          <div class="container">
            <h2>Game on!</h2>
            <p>
              Fusce erat dui, venenatis et erat in, vulputate dignissim lacus.
              Donec vitae tempus dolor,
              <br />
              sit amet elementum lorem. Ut cursus tempor turpis.
            </p>
            <Link class="site-btn">
              Read More <img src={icon1} alt="#" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
