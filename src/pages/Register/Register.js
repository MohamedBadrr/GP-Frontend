import React from "react";
import { FaUser, FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Register/Register.css'
import Alert from 'react-bootstrap/Alert';
import loginphoto from '../../img/pngwing.com (2).png'


const Register = () => {
    return (
        <div className='Register '>
            <div className="container">
                <div className="row">
                    <div className="col-md-7 Registerform">

                        <Form >
                            <h2 >The Future In Your Hands </h2>
                            <p >Welcome Back. Please Login To Your Account</p>

                            <Form.Group className="input-box" >
                                <Form.Control type="text" placeholder="Full Name" />
                                {/* <FaUser className='icon' /> */}
                            </Form.Group>

                            <Form.Group className="input-box" >
                                <Form.Control type="email" placeholder="Email" />
                                {/* <FaUser className='icon' /> */}
                            </Form.Group>

                            <Form.Group className="input-box" >
                                <Form.Control type="password" placeholder="Password" />
                                {/* <FaLock className='icon' /> */}
                            </Form.Group>

                            <Form.Group className="input-box" >
                                <Form.Control type="password" placeholder="Confirm Password" />
                                {/* <FaLock className='icon' /> */}
                            </Form.Group>

                            <Button className="btn btn-blue " variant="primary" type="submit">
                                Ceeate Account 
                            </Button>

                            <div className="register-link">
                                <p>Already Have An Account? <a href="/login"> Login </a></p>
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

export default Register; 