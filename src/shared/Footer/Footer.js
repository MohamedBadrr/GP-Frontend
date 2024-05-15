import React from 'react';
import './Footer.css';
import {  Link, NavLink, useLocation } from 'react-router-dom';


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
          class=""
          >
    <section >
              <div class="footer">
          

          <div class="footer-row footer-links">
          <ul>
          <li ><NavLink  className='footercolor' to="/home">Home</NavLink></li>
          <li ><NavLink  className='footercolor' to="/gamessection">Games</NavLink></li>
          <li ><NavLink  className='footercolor' to="/tutorial">Tutorials</NavLink></li>
          <li ><NavLink  className='footercolor' to="user">Profile</NavLink></li>
          </ul>
          </div>

          <div class="  text-center statement-footer ">
          <span className='base-color fw-bold'>END GAME</span> Copyright © 2021 - All rights reserved || Designed By: <span className='base-color fw-bold'>Team Gamed</span> 
          </div>
          <div class="footer-icons">
          <NavLink href="#"><i class="fa-brands fa-facebook"></i></NavLink>
          <NavLink href="#"><i class="fa-brands fa-youtube"></i></NavLink>
          <NavLink href="#"><i class="fa-brands fa-github"></i></NavLink>
          <NavLink href="#"><i class="fa-brands fa-x-twitter"></i></NavLink>
          </div>
          </div>
            


    </section>



  </footer>
      )
    }
    </>
  );
}





{/* <div
className="text-center p-3 ps-5 fw-bold"
style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
>
© 2023 Copyright : <span className='special-color'>TeamGamed</span>
</div> */}