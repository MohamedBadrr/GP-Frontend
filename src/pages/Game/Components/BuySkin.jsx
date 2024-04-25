import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/buy-skin.css";
import { getAuthUser, updateAuthUser } from '../../../helper/Storage';
import axios from 'axios';
import Plxx from "../../../components/Plxx";

const BuySkin = () => {
    const [showBuyAlert, setShowBuyAlert] = useState({});
    const auth = getAuthUser();
    // const [skins, setSkins] = useState({
    //     loading: false,
    //     data: [],
    //     errors: null,
    // })
    const [Lockedskins, setLockedSkins] = useState({
        loading: false,
        data: [],
        errors: null,
    })
    // useEffect(() => {
    //     if (auth) {
    //         setSkins({ ...skins, loading: true, err: [] });
    //         axios.get("http://localhost:4000/skins/unlocked",
    //             {
    //                 headers: {
    //                     token: auth.token
    //                 }
    //             }).then((resp) => {
    //                 setSkins({ ...skins, data: resp.data, loading: false, errors: "" })
    //                 updateAuthUser(auth.token)

    //             }).catch((errors) => {
    //                 console.log(errors);
    //                 setSkins({ ...skins, loading: false, errors: errors.response.data.errors[0].msg })
    //             });
    //     }
    // }, [])

    useEffect(() => {
        if (auth) {
            setLockedSkins({ ...Lockedskins, loading: true, err: [] });
            axios.get("http://localhost:4000/skins/locked",
                {
                    headers: {
                        token: auth.token
                    }
                }).then((resp) => {
                    setLockedSkins({ ...Lockedskins, data: resp.data, loading: false, errors: "" })
                    updateAuthUser(auth.token)


                }).catch((errors) => {
                    console.log(errors);
                    setLockedSkins({ ...Lockedskins, loading: false, errors: errors.response.data.errors[0].msg })
                });
        }
    }, [])

    const handleLockClick = (itemId) => {
        setShowBuyAlert({ ...showBuyAlert, [itemId]: true }); // Set alert for specific item ID
        // Optionally, reset showBuyAlert after a brief delay
        setTimeout(() => setShowBuyAlert({ ...showBuyAlert, [itemId]: false }), 2000); // Adjust timeout as needed
    };
    const [oneSkin, setOneSkin] = useState({
        loading: false,
        data: [],
        errors: null,
    })

    const buySkin = (id) => {
        if (auth) {
            setOneSkin({ ...oneSkin, loading: true })
            axios.
                post("http://localhost:4000/skins/buy/" + id, {
                    userId: auth.id
                },
                    {
                        headers: {
                            token: auth.token
                        }
                    }).then((resp) => {
                        // setOneSkin({...oneSkin,loading:false});
                        console.log(resp);
                        updateAuthUser(auth.token)
                    }).catch((err) => {
                        console.log(err);
                        setOneSkin({ ...oneSkin, loading: false, errors: err.response.data.errors })
                    })
        }
        // console.log(id);
    }
    return (
        <>
            <section className="buyskins-container ">
                <div className="mt-5">
                    <hr />
                    <h1 className="title-skins">Locked Skins</h1>
                    <div className=" container cards-container locked-skins-contanier">

                        {Lockedskins.data.map((item) => (
                            // <div className="lockedskin" key={item.id}>
                                // {showBuyAlert[item.id] && ( // Check for alert based on item ID
                                //     <div className="alert alert-danger p-1 mx-2 my-2">Please Buy The Skin</div>
                                // )}
                            //     {/* <Link to={`/game?id=${item.id}`}> */}
                            //     <img alt="plane1" src={item.imageUrl} />
                            //     <h4 className="locked-title">{item.name}</h4>
                                // <p className="locked-price">{item.price} <span className="text-white">Conis</span></p>
                                // <button className="d-button mb-3 mt-2 px-4 py-1 buy-now" onClick={(e) => { buySkin(item.id) }}><a href="/selectskin">Buy Now</a></button>
                                // <i
                                //     className="fa-solid fa-lock lock-icon-skin"
                                //     onClick={() => handleLockClick(item.id)} // Pass item.id for specific item
                                // ></i>
                            // </div>

                            <div className='the-lock-card-conatier'>
                                      {showBuyAlert[item.id] && ( // Check for alert based on item ID
                                    <div className="alert alert-danger p-1 mx-2 my-2">Please Buy The Skin</div>
                                )}
                            <div className='imgbox-lock'>
                                <img src={item.imageUrl} alt="" className='plane-lock-card-img ' />
                            {/* <span></span> */}
                            </div>
                            <div className="line"></div>
                            <div className="title ">{item.name}</div>
                            <div className='buysection-lock'>
                            <p className="locked-price">{item.price} <span className="text-white">Conis</span></p>
                            <button className="d-button mb-3 mt-2 px-4 py-1 buy-now" onClick={(e) => { buySkin(item.id) }}><a href="/selectskin">Buy Now</a></button>
                            <i
                                    className="fa-solid fa-lock lock-icon-skin"
                                    onClick={() => handleLockClick(item.id)} // Pass item.id for specific item
                                ></i>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default BuySkin