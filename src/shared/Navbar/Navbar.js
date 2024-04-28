/** @format */
import React, { useEffect, useState } from "react";
import logo from "../../assets/images/LOGOO.png";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { getAuthUser, removeAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [userToggle, setUserToggle] = useState(false);
  const auth = getAuthUser();
  const [user, setUser] = useState({
    loading: false,
    data: [],
    err: [],
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
  }, []);

  const Logout = () => {
    removeAuthUser();
    navigate("/login");
  };

return (
<>
  {pathname === "/login" ||
  pathname === "/register" ||
  pathname === "/game" ? (
    ""
  ) : (
    <nav class="navbar navbar-expand-lg text-white text-center base-navBar">
      <div class="container">
        <Link class="navbar-brand text-white " to="/home">
          {" "}
          <img src={logo} alt="logo" className="logoHeader" />{" "}
        </Link>
        <Link class="navbar-brand text-white " to="/home"></Link>
        <button
          class="navbar-toggler text-white "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon text-white "></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav m-auto mb-2 mb-lg-0 ">
            {auth && (pathname === "/" || pathname === "/home") && (
              <>
                <li class="nav-item">
                  <Link
                    class="nav-link active my-1 mx-2 text-white"
                    to="/home">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <a class="nav-link  my-1 mx-2 text-white " href="#GAMES">
                    Games
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link  my-1 mx-2 text-white "
                    href="#TOTURIALS">
                    Tutorials
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link  my-1 mx-2 text-white " href="#ABOUT">
                    Contact
                  </a>
                </li>
              </>
            )}
            {
              // (auth && (pathname !=="/" || pathname !=="/home")) && (
              auth && pathname !== "/home" && (
                <>
                  <div className="conis-xp">
                    <li class="conis">
                      <h4 class=" mt-2 mx-2 text-white">
                        {" "}
                        Coins :{" "}
                        <span className="base-color">
                          {user.data.coins}
                        </span>
                      </h4>
                    </li>
                    <li class="xp">
                      <h4 class=" mt-2 mx-2 text-white">
                        {" "}
                        XP :{" "}
                        <span className="base-color">{user.data.xp}</span>
                      </h4>
                    </li>
                  </div>
                </>
              )
            }
          </ul>
          {!auth && (
            <>
              {" "}
              <Link to={"/login"}>
                <button class="default-button px-3 py-1 me-3">
                  Login{" "}
                </button>
              </Link>
              <Link to={"/register"}>
                <button class="default-button px-3 py-1">
                  Register{" "}
                </button>
              </Link>{" "}
            </>
          )}
          {auth && (
            <>
              <div>
                <button
                  className="user-toggle"
                  onClick={() => setUserToggle(!userToggle)}>
                  <img
                    alt={`${user.data.name}`}
                    src={user.data.photo}
                    className="user-img"
                  />
                  <span className="user-name">{user.data.name}</span>
                </button>
                {userToggle && (
                  <ul className="user-list">
                    <li>
                      <Link
                        to={"/user"}
                        onClick={() => {
                          setUserToggle(!userToggle);
                        }}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        class="default-button px-3 py-1"
                        onClick={Logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )}
</>
);
}
