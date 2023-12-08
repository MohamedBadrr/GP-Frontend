import React from "react";
import { FaUser, FaLock  } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Register/Register.css'
import Alert from 'react-bootstrap/Alert';

const Register = () => {
    return (
        <div className='register-container'>
            <h1>Register Form</h1>
            <Alert variant="danger">
                Simple Alert
            </Alert>
            {/* <div className="img">
                <img src={loginphoto} className="w-100 imgLogin" alt=""/> 
            </div> */}

            <Form.Group className="input-box" >
                <Form.Control type="text" placeholder="Full Name" />
                <FaUser className='icon-name' />
            </Form.Group>

            <Form>
                <Form.Group className="input-box" >
                    <Form.Control type="email" placeholder="Email" />
                    <MdEmail className='icon-email' />
                </Form.Group>

                <Form.Group className="input-box" >
                    <Form.Control type="password" placeholder="Password" />
                    <FaLock className='icon' />
                </Form.Group>

                <Form.Group className="input-box" >
                    <Form.Control type="password" placeholder="Re-Type Password" />
                    <FaLock className='icon-re' />
                </Form.Group>

                <div className="male">
                    <label><input type="checkbox" /> Male</label>
                </div>

                <div className="female">
                    <label><input type="checkbox" /> Female </label>
                </div>

                <Button className="btn btn-dark w-100" variant="primary" type="submit">
                    Login
                </Button>

            </Form>
        </div>
    )
}

export default Register; 