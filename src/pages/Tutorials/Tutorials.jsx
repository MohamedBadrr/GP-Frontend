/** @format */

import React from "react";
import "./Tutorials.css";
import { Link } from "react-router-dom";

const Tutorials = () => {
    return (
        <>
            <div className="tutorials d-flex justify-content-around align-items-start">
                <div className="container">
                    <div className="row ">
                        <h1 className="mt-4 text-center title-tutorail">
                            Some Tutorials About our Games
                        </h1>
                    </div>
                    <div className="tutorials-videos ">
                        <div className="tutorials-video1">
                            <div className="tutorials-vedio1-skin">
                                <button className="default-button p-3">
                                    <Link to={"https://www.youtube.com/watch?v=75KSKu9ShV0"}>
                                        Watch Tutorial
                                    </Link>
                                </button>
                            </div>
                        </div>
                        <div className="tutorials-video2">
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
