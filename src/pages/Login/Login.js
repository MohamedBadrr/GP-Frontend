import React from "react";
import { FaUser, FaLock } from "react-icons/fa6";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../pages/Login/Login.css'
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import loginphoto from '../../img/pngwing.png'

const Login = () => {
    return (
        
        <div className='login '>
            <div className="container">
            <div className="row">
            <div className="col-md-6 loginform">
            <Form >
            <h2 className="mb-3 edit logintitle">The Future In Your Hands </h2>
            <p className="mb-3">Welcome Back. Please Login To Your Account</p>
                <Form.Group className="input-box" >
                    <Form.Control type="email" placeholder="Username" />
                </Form.Group>
                <Form.Group className="input-box" >
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <div className="remember">
                    <label><input type="checkbox"/> Remember Me</label>
                    <a href="/">Forgot Password</a>
                </div>
                <Button className="d-button border border-0" variant="primary" type="submit">
                    Login
                </Button>
                <div className="register-link">
                    <p>Don't have an account ? <Link to={"/register"}> Register</Link></p>
                </div>
            </Form>
                </div>
                <div className="col-md-5 p-0 imglogin">
                        <img src={loginphoto} className="w-100" alt="" />
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login; 