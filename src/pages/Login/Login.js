import React from "react";
import { FaUser, FaLock } from "react-icons/fa6";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../pages/Login/Login.css'
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import loginphoto from '../../img/pngwing.com (2).png'



const Login = () => {
    return (
        
        <div className='login '>
            <div className="container">
                <div className="col-md-6 loginform">
                <h1 className="future">The Future In Your Hands </h1>
            <h5 >Welcome Back. Please Login To Your Account</h5>
            {/* <Alert variant="danger">
                Simple Alert
            </Alert> */}
            {/* <div className="img">
                <img src={loginphoto} className="w-100" alt=""/> 
            </div> */}

            <Form >
                <Form.Group className="input-box" >
                    <Form.Control type="email" placeholder="Username" />
                    {/* <FaUser className='icon-user' /> */}
                </Form.Group>

                <Form.Group className="input-box" >
                    <Form.Control type="password" placeholder="Password" />
                    {/* <FaLock className='icon-pass' /> */}
                </Form.Group>

                <div className="remember">
                    <label><input type="checkbox" /> Remember Me</label>
                    {/* <Link to={"/"}>Forgot Password</Link> */}
                    <a href="/">Forgot Password</a>
                </div>

                <Button className="btn btn-blue " variant="primary" type="submit">
                    Login
                </Button>

                <div className="register-link">
                    <p>Don't have an account? <a href="/register"> Register</a></p>
                </div>
                
            </Form>
                </div>
                <div className="col-md-6 p-0">
                    <div className="imglogin">
                        <img src={loginphoto}  alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login; 