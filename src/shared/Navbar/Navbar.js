import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { getAuthUser, removeAuthUser } from '../../helper/Storage';
import { useNavigate } from 'react-router-dom';


export default function Header() {
  const navigate= useNavigate(); 
  const location = useLocation()
  const { pathname} = location;

  const auth = getAuthUser();


  
  const Logout =()=>{
    removeAuthUser();
    navigate("/login");
  }
  
  return (
    <>
      {pathname === "/login" || pathname === "/register" || pathname === "/game"? (
        ""
      ) : (
        <nav class="navbar navbar-expand-lg text-white text-center our-navBar">
        <div class="container">
          <Link class="navbar-brand text-white " to="/"><span className='editBarnd'>END</span>GAME</Link>
          <button class="navbar-toggler text-white " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon text-white "></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav m-auto mb-2 mb-lg-0">
              {
              (auth && (pathname === "/" || pathname === "/home" )) && (
                <>
                <li class="nav-item">
                <Link class="nav-link active my-1 mx-2 text-white"  to="/home">Home</Link>
              </li>
              <li class="nav-item">
                <a class="nav-link  my-1 mx-2 text-white "  href="#GAMES">Games</a>
              </li>
              <li class="nav-item">
                <a class="nav-link  my-1 mx-2 text-white "  href="#ABOUT">About Us</a>
              </li>
              <li class="nav-item">
                <Link class="nav-link  my-1 mx-2 text-white "  href="#">Contact</Link>
              </li>
                </>
              )
            }
            {
              // (auth && (pathname !=="/" || pathname !=="/home")) && (
              (auth && (pathname !=="/" )) && (
                <>
                <div className='conis-xp'>
                <li class="conis">
                    <h4 class=" mt-2 mx-2 text-white">  Coins : <span className='special-color'>{auth.coins}</span></h4>
                </li>
                <li class="xp">
                    <h4 class=" mt-2 mx-2 text-white">  XP : <span className='special-color'>{auth.xp}</span></h4>
                </li>
                </div>
                </>
              )
            }

              
            </ul>
            {
              !auth && (
                <>
                <button class="d-button px-3 py-1 me-3 login-btn" > <Link to={"/login"}>Login</Link> </button>
                <button class="d-button px-3 py-1 register-btn" ><Link to={"/register"}>Register</Link> </button>
                </>
              )
            }

            {auth && <button class="d-button px-3 py-1 register-btn" onClick={Logout}>Logout</button> }
          
          </div>
        </div>
      </nav>
      
      
      
      
      
      
      )}
    </>
  );
}
