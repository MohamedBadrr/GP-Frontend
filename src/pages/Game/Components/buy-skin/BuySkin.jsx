import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./buy-skin.css";
import { getAuthUser, updateAuthUser } from '../../../../helper/Storage';
import axios from 'axios';

const BuySkin = () => {
    const navigate = useNavigate();
    const [showBuyAlert, setShowBuyAlert] = useState({});
    const [showFailedBuyAlert, setshowFailedBuyAlert] = useState({});
    const auth = getAuthUser();
    const userCoins = auth.coins;
    const [alertMsg, setAlertMsg] = useState("");
    const [alertBuyMsg, setAlertBuyMsg] = useState("you don't have enough coins");
    const [Lockedskins, setLockedSkins] = useState({
        loading: false,
        data: [],
        errors: "setLockedSkins",
    })
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
        setShowBuyAlert({ ...showBuyAlert, [itemId]: true });
        setAlertMsg("Please Buy Skin.");
        setTimeout(() => setShowBuyAlert({ ...showBuyAlert, [itemId]: false }), 2000);
    };


    const handleBuyClick = (itemId) => {
        setshowFailedBuyAlert({ ...showFailedBuyAlert, [itemId]: true });
        setAlertBuyMsg("You Don't Have Enough Coins");
        setTimeout(() => setshowFailedBuyAlert({ ...showFailedBuyAlert, [itemId]: false }), 2000);
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
                        updateAuthUser(auth.token);
                        navigate("/selectskin");
                        updateAuthUser()
                        window.location.reload();
                    }).catch((err) => {
                        setAlertMsg(err.response.data.errors[0].msg);
                        setOneSkin({ ...oneSkin, loading: false, errors: err.response.data.errors[0].msg });
                        handleBuyClick(id);
                    })
        }
    }
    return (
        <>
            <section className="buy-skin">
                <h1 className="buy-skin-title">Locked Skins</h1>
                <div className=" container buy-skin-card">
                    {Lockedskins.data.map((item) => (
                        <div className="buy-skin-locked" key={item.id}>
                            {showBuyAlert[item.id] && ( 
                                <div className="alert alert-danger p-1 mx-2 my-2">Please Buy The Skin</div>
                            )}
                            {showFailedBuyAlert[item.id] && ( 
                                <div className="alert alert-danger p-1 mx-2 my-2">{alertBuyMsg}</div>
                            )}
                            <img alt="plane1" src={item.imageUrl} />
                            <h4 className="buy-skin-name">{item.name}</h4>
                            <p className="buy-skin-price fw-bold">{item.price} <span className="text-warning"></span>  <i class="fa-solid fa-coins text-warning"></i></p>
                            <button className="buy-skin-button mb-3 mt-2 px-4 py-1" onClick={(e) => { buySkin(item.id) }}>Buy Now</button>
                            <i
                                className="fa-solid fa-lock buy-skin-close"
                                onClick={() => handleLockClick(item.id)}
                            ></i>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default BuySkin