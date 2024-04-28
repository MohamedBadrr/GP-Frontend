import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./select-skin.css";
import { getAuthUser, updateAuthUser } from '../../../../helper/Storage';
import axios from 'axios';
export default function SelectSkin() {
  const auth = getAuthUser();
  const [skins, setSkins] = useState({
    loading: false,
    data: [],
    errors: null,
  })
  useEffect(() => {
    if (auth) {
      setSkins({ ...skins, loading: true, err: [] });
      axios.get("http://localhost:4000/skins/unlocked",
        {
          headers: {
            token: auth.token
          }
        }).then((resp) => {
          setSkins({ ...skins, data: resp.data, loading: false, errors: "" })
          updateAuthUser(auth.token)
        }).catch((errors) => {
          console.log(errors);
          setSkins({ ...skins, loading: false, errors: errors.response.data.errors[0].msg })
        });
    }
  }, [])
  return (
    <>
      <section className="select-skin">
        <h1 className="select-skin-title">YOUR Planes</h1>
        <div className="container select-skin-card pb-4 mb-4">
          {
            skins.data.map((item) => {
              return (
                <div className='select-skin-card-shape'>
                  <div className='select-skin-imgbox'>
                    <img src={item.imageUrl} alt="" />
                  </div>
                  <div className="slect-skin-line"></div>
                  <div className="select-skin-name ">{item.name}</div>
                  <div className='select-skin-button'>
                    <Link className="text-decoration-none" to={`/game?id=${item.id}`}>
                      <button className="select-skin-button-decoration mt-1 px-5 py-1" >
                        Play</button></Link>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  );
}
