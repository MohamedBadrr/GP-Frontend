/** @format */
import React from "react";
import "./Home.css";
import homeBanner from "../../assets/images/banner_img.png";
import GamesSection from "../GamesSection/GamesSection";
import Tutorials from "../Tutorials/Tutorials";


export default function Home() {
  return (
    <>
      <section id="HOME-SECTION">
        <div className="body-home">
          <div className="home-section">
            <div className="container-fluid">
              <div className=" row ">
                <div className="col-md-4 offset-1 home-text">
                  <h1>
                    Best Games Of <br /> The Latest
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing <br />
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Quis ipsum
                  </p>
                  <button className="default-button px-5 py-2 mt-3 watch-button">
                    <a
                      className="text-decoration-none text-white"
                      href="#GAMES">
                      watch Games
                    </a>
                  </button>
                </div>
                <div className="col-md-6 home-banner ">
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

      <section id="ABOUT">
        <Tutorials />
      </section>
    </>
  );
}
