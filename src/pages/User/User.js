/** @format */
import React, { useEffect, useRef, useState } from "react";
import "./User.css";
import axios from "axios";
import { getAuthUser, setAuthUser } from "../../helper/Storage";
export default function User() {
  const auth = getAuthUser();
  const [user, setUser] = useState({
    loading: false,
    data: [],
    err: [],
    reload : 0,
  });

  useEffect(() => {
    if (auth) {
      setUser({ ...user, loading: true, err: [] });
      axios
        .get("http://localhost:4000/user/info", {
          headers: {
            token: auth.token,
          },
        })
        .then((resp) => {
          setUser({ ...user, data: resp.data, loading: false, err: "" });
          
        })
        .catch((errors) => {
          setUser({
            ...user,
            loading: false,
            err: errors.response.data.errors[0].msg,
          });
        });
    }
  }, [user.reload]);
  const [updatedUser, setUpdatedUser] = useState({
    name: auth.name,
    email: auth.email,
    password: "",
    photo: "",
    loading: false,
    err: null,
    reload: false,
    success: null,
  });
  
  const image = useRef(null);
  const userUpdate = (event) => {
    event.preventDefault();
    setUpdatedUser({ ...updatedUser, loading: true, err: [] });
    const formData = new FormData();
    if (updatedUser.name !== "") {
      formData.append("name", updatedUser.name);
    } else { 
      formData.append("name", user.data.name);
    }
    if (updatedUser.email !== "") {
      formData.append("email", updatedUser.email);
    } else {
      formData.append("email", user.data.email);
    }
    if (updatedUser.password !== "") {
      formData.append("password", updatedUser.password);
    }
    if (image.current.files && image.current.files[0]) {
      formData.append("photo", image.current.files[0]);
    }
    axios
      .put("http://localhost:4000/user/update", formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setUpdatedUser({
          ...updatedUser,
          loading: false,
          err: null,
          success: resp.data.msg,
          reload: updatedUser.reload + 1,
          name:resp.data.name
        });
        setUser({...user,reload1: user.reload +1})
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setUpdatedUser({
          ...updatedUser,
          loading: false,
          success: null,
          err: err.response.data.errors[0].msg,
        });
      });
  };
  return (
    <>
      <div className="user-section">
        <div class="container-xl px-4 mt-10 ">
        <h1 className="text-center mb-5 title-user">Welcome To Your Profile</h1>
          <div class="row">
            <div class="col-xl-4 animation-image-user ">
              {/* <!-- Profile picture card--> */}
              <div class="card card-style mb-4 mb-xl-0 card-imge-user">
                <div class="card-header ">Profile Picture</div>
                <div class="card-body section-image-user text-center">
                  {/* <!-- Profile picture image--> */}
                  <img
                    class="img-account-profile rounded-circle mb-2"
                    src={user.data.photo}
                    alt=""
                  />
                  {/* <!-- Profile picture help block--> */}
                  <div class="small font-italic text-muted mb-4">
                    JPG or PNG no larger than 5 MB
                  </div>
                  {/* <!-- Profile picture upload button--> */}
                  <input
                    type="file"
                    className="btn default-button imageimageInput text-white"
                    ref={image}></input>
                </div>
              </div>
            </div>
            <div class="col-xl-8">
              {/* <!-- Account details card--> */}
              <div class="card card-style mb-4 card-user-animation">
                <div class="card-header text-center">Account Details</div>
                {updatedUser.err && (
                  <div class="alert alert-danger text-center p-2" role="alert">
                    {updatedUser.err}
                  </div>
                )}
                {updatedUser.success && (
                  <div class="alert alert-success text-center p-2" role="alert">
                    {updatedUser.success}
                  </div>
                )}
                <div class="card-body  section-data-user ">
                  <form onSubmit={userUpdate}>
                    {/* <!-- Form Group (username)--> */}
                    <div class="mb-3">
                      <label class="label-edit ms-2 mb-1">Name</label>
                      <input
                        class="form-control"
                        id="inputUsername"
                        type="text"
                        placeholder={`${user.data.name}`}
                        value={updatedUser.name}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* <!-- Form Group (email address)--> */}
                    <div class="mb-3">
                      <label class="label-edit ms-2 mb-1">Email address</label>
                      <input
                        class="form-control"
                        id="inputEmailAddress"
                        type="email"
                        // placeholder={}
                        value={updatedUser.email}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div class="mb-3">
                      <label class="label-edit ms-2 mb-1">Password</label>
                      <input
                          className="form-control edit-password"
                          id="inputPhone"
                          type="password"
                          placeholder="Enter your Password"
                          value={updatedUser.password}
                          required
                          onChange={(e) =>
                            setUpdatedUser({
                              ...updatedUser,
                              password: e.target.value,
                            })
                          }
                        />
                    </div>
                    {/* <!-- Save changes button--> */}
                    <button class="btn default-button text-white fw-bold mt-2 mb-3" type="submit">
                      Save changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
