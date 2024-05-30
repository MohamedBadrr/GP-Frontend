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

  // useEffect(() => {
  //   const elementsLeftnav = document.querySelectorAll(".animation-nav");

  //   if (elementsLeftnav.length > 0) {
  //     const options = {
  //       root: null,
  //       rootMargin: "0px",
  //       threshold: 0.4,
  //     };
  //     const callbacks = (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add("nav-animation");
  //         } else {
  //           entry.target.classList.remove("nav-animation");
  //         }
  //       });
  //     };
  //     const observer = new IntersectionObserver(callbacks, options);
  //     elementsLeftnav.forEach((element) => observer.observe(element));
  //     return () => {
  //       if (elementsLeftnav && observer) {
  //         elementsLeftnav.forEach((element) => observer.unobserve(element));
  //       }
  //     };
  //   }
  // }, []);

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
    <nav class="navbar navbar-expand-lg navbar-dark text-white text-center base-navBar ">
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
        <div class="collapse navbar-collapse " id="navbarSupportedContent">
          <ul class="navbar-nav m-auto mb-2 mb-lg-0 animation-nav">
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
                    Contact us
                  </a>
                </li>
              </>
            )}
            {
              (auth && (pathname !== "/" && pathname !== '/home')) ? (
                <>
                  <div className="conis-xp">
                    <li class="conis">
                      <h4 class=" mt-2 mx-2 text-white">
                        {" "}
                        Coins :{" "}
                        <span className="base-color">
                          {user.data.coins} <i class="fa-solid fa-coins text-warning ms-2"></i>
                        </span>
                      </h4>
                    </li>
                    <div class="range" style={{"--p":user.data.xp%100}}>
                          <div class="range__label progress">Level : {(user.data.xp-(user.data.xp%100))/100}</div>
                      </div>
                  </div>
                </>
              ): ""
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
              <div className="container-user-toggle">
                <button
                  className="user-toggle"
                  onClick={() => setUserToggle(!userToggle)}>
                  <img
                    alt={`${user.data.name}`}
                    src={user.data.photo}
                    className="user-img"
                  />
                  <span className="user-name fw-bold">{user.data.name}</span>
                </button>
                {userToggle && (
                  <ul className="user-list">
                    <li>
                      <Link className="small-link"
                        to={"/home"}
                        onClick={() => {
                          setUserToggle(!userToggle);
                        }}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="small-link"
                        to={"/gamessection"}
                        onClick={() => {
                          setUserToggle(!userToggle);
                        }}>
                        Games
                      </Link>
                    </li>
                    <li>
                      <Link className="small-link"
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
