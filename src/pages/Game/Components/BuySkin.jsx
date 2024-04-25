import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/buy-skin.css";
import { getAuthUser, updateAuthUser } from '../../../helper/Storage';
import axios from 'axios';
import Plxx from "../../../components/Plxx";

const BuySkin = () => {
    const navigate  = useNavigate();
    const [showBuyAlert, setShowBuyAlert] = useState({});
    const [showFailedBuyAlert, setshowFailedBuyAlert] = useState({});
    const auth = getAuthUser();
    const userCoins = auth.coins;
    const [alertMsg,setAlertMsg]=useState("");
    const [alertBuyMsg,setAlertBuyMsg]=useState("you don't have enough coins");
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
                        window.location.reload();
                    }).catch((err) => {
                        setAlertMsg(err.response.data.errors[0].msg);
                        setOneSkin({ ...oneSkin, loading: false, errors: err.response.data.errors[0].msg});
                        handleBuyClick(id);
                    })
        }
    }
    return (
        <>
            <section className="buyskins-container ">
                <div className="">
                    <h1 className="title-skins-locked">Locked Skins</h1>
                    <div className=" container cards-container locked-skins-contanier">
                        {Lockedskins.data.map((item) => (
                            <div className="lockedskin" key={item.id}>
                                {showBuyAlert[item.id] && ( // Check for alert based on item ID
                                    <div className="alert alert-danger p-1 mx-2 my-2">Please Buy The Skin</div>
                                )}
                                {/* <Link to={`/game?id=${item.id}`}> */}
                                <img alt="plane1" src={item.imageUrl} />
                                <h4 className="locked-title">{item.name}</h4>
                                <p className="locked-price">{item.price} <span className="text-white">Conis</span></p>
                                <button className="d-button mb-3 mt-2 px-4 py-1 buy-now" onClick={(e) => { buySkin(item.id) }}><a href="/selectskin">Buy Now</a></button>
                                <i
                                    className="fa-solid fa-lock lock-icon-skin"
                                    onClick={() => handleLockClick(item.id)} 
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