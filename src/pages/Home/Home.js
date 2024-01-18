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

      <div class="body_bg">
        <header class="main_menu single_page_menu">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-12">
                <nav class="navbar navbar-expand-lg navbar-light">
                  <a class="navbar-brand" href="index.html">
                    {" "}
                    <img src="img/logo.png" alt="logo" />{" "}
                  </a>
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="menu_icon">
                      <i class="fas fa-bars"></i>
                    </span>
                  </button>

                  <div
                    class="collapse navbar-collapse main-menu-item"
                    id="navbarSupportedContent"
                  >
                    <ul class="navbar-nav">
                      <li class="nav-item">
                        <a class="nav-link" href="index.html">
                          Home
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="fighter.html">
                          fighter
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="team.html">
                          team
                        </a>
                      </li>
                      <li class="nav-item dropdown">
                        <a
                          class="nav-link dropdown-toggle"
                          href="blog.html"
                          id="navbarDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Blog
                        </a>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <a class="dropdown-item" href="blog.html">
                            {" "}
                            blog
                          </a>
                          <a class="dropdown-item" href="single-blog.html">
                            Single blog
                          </a>
                        </div>
                      </li>
                      <li class="nav-item dropdown">
                        <a
                          class="nav-link dropdown-toggle"
                          href="blog.html"
                          id="navbarDropdown1"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          pages
                        </a>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="navbarDropdown1"
                        >
                          <a class="dropdown-item" href="elements.html">
                            Elements
                          </a>
                        </div>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="contact.html">
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                  <a href="#" class="btn_1 d-none d-sm-block">
                    Install Now
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </header>
        <section class="banner_part">
          <div class="container">
            <div class="row align-items-center justify-content-between">
              <div class="col-lg-6 col-md-8">
                <div class="banner_text">
                  <div class="banner_text_iner">
                    <h1>Best Games of the Latest</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis ipsum{" "}
                    </p>
                    <a href="#" class="btn_1">
                      Watch Games
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="live_stareams padding_bottom">
          <div class="container-fluid">
            <div class="row align-items-center justify-content-between">
              <div class="col-md-2 offset-lg-2 offset-sm-1">
                <div class="live_stareams_text">
                  <h2>
                    let's <br /> Play
                  </h2>
                  <div class="btn_1">Start now</div>
                </div>
              </div>
              <div class="col-md-7 games">
                <div class="live_stareams_slide owl-carousel">
                  <div class="live_stareams_slide_img">
                    <img src="img/live_streams_1.png" alt="" />
                    <div class="extends_video">
                      <a
                        id="play-video_1"
                        class="video-play-button popup-youtube"
                        href="https://www.youtube.com/watch?v=pBFQdxA-apI"
                      >
                        <span class="fas fa-play"></span>
                      </a>
                    </div>
                  </div>
                  <div class="live_stareams_slide_img">
                    <img src="img/live_streams_2.png" alt="" />
                    <div class="extends_video">
                      <a
                        id="play-video_1"
                        class="video-play-button popup-youtube"
                        href="https://www.youtube.com/watch?v=pBFQdxA-apI"
                      >
                        <span class="fas fa-play"></span>
                      </a>
                    </div>
                  </div>
                  <div class="live_stareams_slide_img">
                    <img src="img/live_streams_1.png" alt="" />
                    <div class="extends_video">
                      <a
                        id="play-video_1"
                        class="video-play-button popup-youtube"
                        href="https://www.youtube.com/watch?v=pBFQdxA-apI"
                      >
                        <span class="fas fa-play"></span>
                      </a>
                    </div>
                  </div>
                  <div class="live_stareams_slide_img">
                    <img src="img/live_streams_2.png" alt="" />
                    <div class="extends_video">
                      <a
                        id="play-video_1"
                        class="video-play-button popup-youtube"
                        href="https://www.youtube.com/watch?v=pBFQdxA-apI"
                      >
                        <span class="fas fa-play"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section class="Latest_War">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-8">
                <div class="section_tittle text-center">
                  <h2> Some Videos About our Games </h2>
                </div>
              </div>
            </div>
            <div class="row justify-content-center align-items-center">
              <div class="col-lg-5">
                <div class="Latest_War_text">
                  <div class="row justify-content-center align-items-center h-100">
                    <div class="col-lg-6">
                      <div class="single_war_text text-center">
                        <img src="img/favicon.png" alt="" />
                        <h4>Open War chalange</h4>
                        <p>27 june , 2020</p>
                        <a href="#">view fight</a>
                        <div class="war_text_item d-flex justify-content-around align-items-center">
                          <img src="img/war_logo_1.png" alt="" />
                          <h2>
                            190<span>vs</span>189
                          </h2>
                          <img src="img/war_logo_2.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="#" class="btn_2">
                    Watch Tutorial
                  </a>
                </div>
              </div>
              <div class="offset-sm-1 col-lg-5">
                <div class="Latest_War_text">
                  <div class="row justify-content-center align-items-center h-100">
                    <div class="col-lg-6">
                      <div class="single_war_text text-center">
                        <img src="img/favicon.png" alt="" />
                        <h4>Open War chalange</h4>
                        <p>27 june , 2020</p>
                        <a href="#">view fight</a>
                        <div class="war_text_item d-flex justify-content-around align-items-center">
                          <img src="img/war_logo_1.png" alt="" />
                          <h2>
                            190<span>vs</span>189
                          </h2>
                          <img src="img/war_logo_2.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="#" class="btn_2">
                    Watch Tutorial
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
