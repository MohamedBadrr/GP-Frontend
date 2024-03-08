import React from 'react';
import './Footer.css';
import {  useLocation } from 'react-router-dom';

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
        <div class="row mt-3" >
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 m">
            <h6 class="text-uppercase fw-bold">LOGO</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={{width:' 60px', backgroundColor: '#7c4dff', height: "2px"}}
                />
            <p>
              Explition of the site
            </p>
          </div>

          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold">Products</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={{width:' 60px', backgroundColor: '#7c4dff', height: "2px"}}
                />
            <p>
              <a href="#!" class="text-white">Game1</a>
            </p>
            <p>
              <a href="#!" class="text-white">Game2</a>
            </p>
          </div>

          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold">Useful links</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                />
            <p>
              <a href="#!" class="text-white">Your Profile</a>
            </p>
            <p>
              <a href="#!" class="text-white">About Us</a>
            </p>
            <p>
              <a href="#!" class="text-white">Help</a>
            </p>
          </div>

          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 class="text-uppercase fw-bold">Contact</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                />
            <p><i class="fas fa-home mr-3"></i> TeamGamed Link</p>
            <p><i class="fas fa-envelope mr-3"></i> info@example.com</p>
            <p><i class="fas fa-phone mr-3"></i> + 01 234 567 88</p>
            <p><i class="fas fa-print mr-3"></i> + 01 234 567 89</p>
          </div>
        </div>
      </div>
    </section>

    <div
        class="text-center p-3"
        style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
        >
      © 2023 Copyright: TeamGamed
      
    </div>
  </footer>
      )
    }
    </>
  );
}
