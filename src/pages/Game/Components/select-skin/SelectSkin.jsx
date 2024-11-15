import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./select-skin.css";
import { getAuthUser, updateAuthUser } from '../../../../helper/Storage';
import axios from 'axios';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function SelectSkin() {
  const auth = getAuthUser();
  const [skins, setSkins] = useState({
    loading: false,
    data: [],
    errors: null,
  });
 
  const options = {
    items: 1,
    loop: skins.data.length > 3, // Loop only if more than 3 items
    autoplay: skins.data.length > 3, // Autoplay only if more than 3 items
    autoplayTimeout: 4000,
    nav: true,
    dots: true,
    margin: 15,
    responsive: {
      1100: {
        items: Math.min(3, skins.data.length), // Adjust items to the number of skins
      },
      724: {
        items: 1,
      },
      500: {
        items: 1,
      },
    },
  };

  useEffect(() => {
    if (auth) {
      setSkins({ ...skins, loading: true, err: [] });
      axios.get("http://localhost:4000/skins/unlocked", {
        headers: {
          token: auth.token
        }
      }).then((resp) => {
        setSkins({ ...skins, data: resp.data, loading: false, errors: "" });
        updateAuthUser(auth.token);
      }).catch((errors) => {
        console.log(errors);
        setSkins({ ...skins, loading: false, errors: errors.response.data.errors[0].msg });
      });
    }
  }, []);

  return (
    <section className="select-skin">
      <h1 className="select-skin-title">YOUR Planes</h1>
      <div className="container select-skin-card pb-4 mb-4">

        {skins.loading ? (
          <div>Loading...</div>
        ) : (
           <>{skins.data.length?
           <>
            <OwlCarousel className='owl-theme' {...options}>
            {skins.data.map((item) => (
              <div key={item.id} className="item-owl-carsoual text-center active-owl-skin">
                <div className='select-skin-card-shape'>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <div className='select-skin-imgbox'>
                    <img src={item.imageUrl} alt="" />
                  </div>
                  <div className="slect-skin-line"></div>
                  <div className="select-skin-name ">{item.name}</div>
                  <div className='select-skin-button'>
                    <Link className="text-decoration-none" to={`/game?id=${item.id}`}>
                      <button className="select-skin-button-decoration mt-1 px-5 py-1">
                        Play
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
           </>
           :<>
           <div>
           <h2 className="noskins">You Don't have Skins , Please Buy skins </h2>
          <Link to={"/buyskin"} className="default-button p-2 noskins-button">Buy New Skins</Link>
           </div>
           </>}</>
          
        )}
      </div>
    </section>
  );
}