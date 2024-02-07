import React from "react";
import { FaUser, FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Register/Register.css'
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import loginphoto from '../../img/pngwing.png'


const Register = () => {
    return (
        <div className='Register '>
            <div className="container">
                <div className="row">
                    <div className="col-md-7 Registerform">
                        <Form >
                            <h2 className="edit">The Future In Your Hands </h2>
                            <p className="mb-4">Welcome. Please Fill all Fileds to Registeration</p>
                            <Form.Group className="input-box" >
                                <Form.Control type="text" placeholder="Full Name" />
                            </Form.Group>
                            <Form.Group className="input-box" >
                                <Form.Control type="email" placeholder="Email" />
                            </Form.Group>
                            <Form.Group className="input-box" >
                                <Form.Control type="password" placeholder="Password" />
                                {/* <FaLock className='icon' /> */}
                            </Form.Group>
                            <Form.Group className="input-box" >
                                <Form.Control type="password" placeholder="Confirm Password" />
                                {/* <FaLock className='icon' /> */}
                            </Form.Group>
                            <Button className="d-button border border-0 p-2 mt-3" variant="primary" type="submit">
                                Register 
                            </Button>
                            <div className="register-link">
                                <p>Already Have An Account ? <Link to="/login"> Login </Link></p>
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