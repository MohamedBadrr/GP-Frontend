import React, { useEffect } from 'react';
import './Footer.css';
import { Link, NavLink, useLocation } from 'react-router-dom';



export default function Footer() {
  useEffect(() => {
    const elementtopfooter = document.querySelectorAll(".animation-footer");
    const elementbottomfooter = document.querySelectorAll(".animation-bottom-footer");
    if (elementtopfooter.length > 0 || elementbottomfooter.length > 0) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.4,
      };
      const callbacks = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("footer-animation");
          } else {
            entry.target.classList.remove("footer-animation");
          }
        });
      };
      const observer = new IntersectionObserver(callbacks, options);
      elementtopfooter.forEach((element) => observer.observe(element));
      elementbottomfooter.forEach((element) => observer.observe(element));

      return () => {
        if (elementtopfooter && observer) {
          elementtopfooter.forEach((element) => observer.unobserve(element));
        }
        if (elementbottomfooter && observer) {
          elementbottomfooter.forEach((element) => observer.unobserve(element));
        }
      };
    }
  }, []);

  const location = useLocation()
  const { pathname } = location;
  return (
    <>
      {
        pathname === "/login" || pathname === "/register" || pathname === "/game" || pathname === "/game-round/*" ? (
          ""
        ) : (
          <footer className='footer-all-animation'>
            <section>
              <div class="footer ">
                <div class="footer-row footer-links animation-footer">
                  <ul>
                    <li ><Link className='footercolor' to="/home">Home</Link></li>
                    <li ><Link className='footercolor' to="/gamessection">Games</Link></li>
                    <li ><Link className='footercolor' to="/tutorial">Tutorials</Link></li>
                    <li ><Link className='footercolor' to="user">Profile</Link></li>
                  </ul>
                </div>
                <div class="  text-center statement-footer animation-bottom-footer">
                  <span className='base-color fw-bold'>END GAME</span> Copyright © 2021 - All rights reserved || Designed By: <span className='base-color fw-bold'>Team Gamed</span>
                </div>
                <div class="footer-icons animation-bottom-footer">
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