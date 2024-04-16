import React from 'react';
import './Footer.css';
import {  Link, useLocation } from 'react-router-dom';


export default function Footer() {
  const location = useLocation()
  const { pathname} = location;
  return (
    <>
    {
      pathname === "/login" || pathname === "/register" || pathname === "/game" || pathname === "/game-round/*"? (
        ""
      ) : (
        <footer
          class="text-center text-lg-start text-white"
          style={{backgroundColor: "#1c2331"}}
          >
    {/* <section
            class="d-flex justify-content-between p-4"
            style={{backgroundColor:" #6351ce"}}
            >
      <div class="me-5">
        <span>Get connected with us on social networks:</span>
      </div>

      <div>
        <a href="" class="text-white me-4">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-google"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-github"></i>
        </a>
      </div>
    </section> */}

    <section >
      <div class="container text-center text-md-start mt-5" >
        <div class="row mt-3 pt-2 pb-0" >
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto ">

          <div className='titlefooter'>
          <h2 className='special-color ms-3'>
            END
          </h2>
            <h2 className=''>
              GAME
            </h2>
          </div>





          </div>

          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-2 middle-text" >
            <p>
              <Link href="#!" class="  planelink">Plane Game</Link>
            </p>
            <p>
            <Link href="#!" class="ms-3">Rock Paper Seccior</Link>
            </p>
          </div>


          <div class="col-md-3 col-lg-2 text-center col-xl-2 mx-auto mt-3 last-text">
                <p>
                  <Link to={'/user'} class="profileLink">Your Profile</Link>
                </p>
                  <p>
                    <a href="#!" class="">About Us</a>
                  </p>
          </div>
          
        </div>
      </div>
      <div
        className="text-center p-3 ps-5 fw-bold"
        style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
        >
      © 2023 Copyright : <span className='special-color'>TeamGamed</span>
    </div>
    </section>



  </footer>
      )
    }
    </>
  );
}
