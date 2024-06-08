/** @format */
import React, { useEffect } from "react";
import "./Home.css";
import homeBanner from "../../assets/images/banner_img.png";
import GamesSection from "../GamesSection/GamesSection";
import Tutorials from "../Tutorials/Tutorials";
import ContactUs from "../contactus/ContactUs";
import { TableOfUsers } from "../TableOfUsers/TableOfUsers";


export default function Home() {
  useEffect(() => {
    const elementsLeft = document.querySelectorAll(".home-animation");
    const elementsappear = document.querySelectorAll(".banner-animation");
    const elementsRight = document.querySelectorAll(".button-animation");


    if (elementsLeft.length > 0 || elementsRight.length || elementsappear.length > 0) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.4,
      };

      const callbacks = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animation-home");
          } else {
            entry.target.classList.remove("animation-home");
          }
        });
      };

      const observer = new IntersectionObserver(callbacks, options);

      elementsLeft.forEach((element) => observer.observe(element));
      elementsRight.forEach((element) => observer.observe(element));
      elementsappear.forEach((element) => observer.observe(element));

      return () => {
        if (elementsLeft && elementsRight && elementsappear && observer) {
          elementsLeft.forEach((element) => observer.unobserve(element));
          elementsRight.forEach((element) => observer.unobserve(element));
          elementsappear.forEach((element) => observer.unobserve(element));
        }
      };
    }
  }, []);
  return (
    <>
      <section className="all-sections-home">
        <section id="HOME-SECTION">
          <div className="body-home">
            <div className="home-section">
              <div className="container-fluid">
                <div className=" row ">
                  <div className="col-md-5 offset-1 home-text home-animation">
                    <h1>
                      Best Games Of The Latest
                    </h1>
                    <p>
                        Open Your Webcam and Enjoy With A New Experience in Controlling Games<br/>
                            "the possibilities beyond your imagination"
                    </p>
                    <button className="default-button px-5 py-2 mt-3 watch-button button-animation">
                      <a
                        className="text-decoration-none text-white"
                        href="#GAMES">
                        watch Games
                      </a>
                    </button>
                  </div>
                  <div className="col-md-6 home-banner banner-animation ">
                    <img src={homeBanner} alt="banner" className="w-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="GAMES">
          <GamesSection />
        </section>

        <section id="TOTURIALS">
          <Tutorials />
        </section>

        <section className="tableofUsers">
          <TableOfUsers />
        </section>
        
        <section >
          <ContactUs />
        </section>

      </section>
    </>
  );
}
