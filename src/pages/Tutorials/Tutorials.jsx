/** @format */

import React, { useEffect } from "react";
import "./Tutorials.css";
import { Link } from "react-router-dom";

const Tutorials = () => {
    useEffect(() => {
        const elementsLeft = document.querySelectorAll(".tutorial-animation-left");
        const elementsRight = document.querySelectorAll(".tutorial-animation-right");
        const elementsappear = document.querySelectorAll(".tutorial-animation-appear");

        if (elementsLeft.length > 0 || elementsRight.length || elementsappear > 0) {
            const options = {
                root: null,
                rootMargin: "0px",
                threshold: 0.4,
            };

            const callbacks = (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animation-tutorials");
                    } else {
                        entry.target.classList.remove("animation-tutorials");
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
            <div className="tutorials d-flex justify-content-around align-items-center">
                <div className="container">
                    <div className="row ">
                        <h1 className="mt-4 text-center title-tutorail tutorial-animation-appear">
                            Some Tutorials About our Games
                        </h1>
                    </div>
                    <div className="tutorials-videos ">
                        <div className="tutorials-video1 tutorial-animation-left">
                            <div className="tutorials-vedio1-skin">
                                <button className="default-button p-3">
                                    <Link to={"https://www.youtube.com/watch?v=75KSKu9ShV0"}>
                                        Watch Tutorial
                                    </Link>
                                </button>
                            </div>
                        </div>
                        <div className="tutorials-video2 tutorial-animation-right">
                            <div className="tutorials-vedio2-skin">
                                <button className="default-button p-3">
                                    <Link to={"https://www.youtube.com/watch?v=75KSKu9ShV0"}>
                                        Watch Tutorial
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tutorials;
