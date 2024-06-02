/** @format */
import React, { useEffect } from "react";
import "./GamesSection.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import img1 from "../../assets/images/Space Battle.gif";
import img2 from "../../assets/images/Rock Paper Scissors.gif";
import { Link } from "react-router-dom";

const GamesSection = () => {

    useEffect(() => {
        const elements = document.querySelectorAll(".carsoul-games-h1, .carsoul-games-button, .owl-theme-animation");

        if (elements.length > 0) {
            const options = {
                root: null,
                rootMargin: "0px",
                threshold: 0.4,
            };

            const callbacks = (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animation-effect");
                    } else {
                        entry.target.classList.remove("animation-effect"); // Remove class on scroll out
                    }
                });
            };

            const observer = new IntersectionObserver(callbacks, options);
            elements.forEach((element) => observer.observe(element));

            return () => {
                if (elements && observer) {
                    elements.forEach((element) => observer.unobserve(element));
                }
            };
        }
    }, []);

    const options = {
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 6000,
        nav: true,
        dots: true,
        margin: 15,
        responsive: {
            1100: {
                items: 2,
            },
            724: {
                items: 1,
            },
            500: {
                items: 1,
            },
        },
    };
    return (
        <>
            <div className="game-section-games">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 offset-1 carsoul-games-text">
                            <h1 className="lets-play carsoul-games-h1">
                                <span className="base-color">L</span>et
                                <span className="base-color">'s</span>
                                <span className="base-color"> P</span>la
                                <span className="base-color">y </span>
                                <span className="base-color">N</span>o
                                <span className="base-color">w</span>
                            </h1>
                            <button className="default-button carsoul-games-button">
                                <Link
                                    className="text-decoration-none text-white"
                                    to={"/mainamenu"}>
                                    Start Now
                                </Link>
                            </button>
                        </div>
                        <div className="col-md-7 owl-theme-animation">
                            <OwlCarousel className="owl-theme" {...options}>
                                <div class="item-owl-carsoual text-center">
                                    <h4 className="my-3">
                                        <span className="base-color">Space</span> Adventure
                                    </h4>
                                    <img src={img1} alt="" className="img-carsoul" />
                                    <div className="game-skin-carsoul">
                                        <Link to={"/mainamenu"}>
                                            <i class="fa-solid fa-circle-play fa-5x"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div class="item-owl-carsoual text-center">
                                    <h4 className="my-3">
                                        <span className="base-color">Rock </span>Paper{" "}
                                        <span className="base-color">Scissor</span> Game
                                    </h4>
                                    <img src={img2} alt="" className="img-carsoul" />
                                    <div className="game-skin-carsoul">
                                        <Link to={"/RPS-Game"}>
                                            <i class="fa-solid fa-circle-play fa-5x "></i>
                                        </Link>
                                    </div>
                                </div>
                                <div class="item-owl-carsoual text-center">
                                    <h4 className="my-3">
                                        <span className="base-color">Space</span> Adventure
                                    </h4>
                                    <img src={img1} alt="" className="img-carsoul" />
                                    <div className="game-skin-carsoul">
                                        <Link to={"/mainamenu"}>
                                            <i class="fa-solid fa-circle-play fa-5x"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div class="item-owl-carsoual text-center">
                                    <h4 className="my-3">
                                        <span className="base-color">Rock </span>Paper{" "}
                                        <span className="base-color">Scissor</span> Game
                                    </h4>
                                    <img src={img2} alt="" className="img-carsoul" />
                                    <div className="game-skin-carsoul">
                                        <Link to={"/RPS-Game"}>
                                            <i class="fa-solid fa-circle-play fa-5x "></i>
                                        </Link>
                                    </div>
                                </div>
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GamesSection;
