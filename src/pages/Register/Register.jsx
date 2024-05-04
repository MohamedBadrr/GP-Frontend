import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Register/Register.css'
import { Link } from 'react-router-dom';
import loginphoto from '../../assets/images/pngwing.png'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from "../../helper/Storage";
const Register = () => {

    const navigate = useNavigate();
    const [register, setRegister] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        loading: false,
        err: null,
    });

    const RegisterFun = (event) => {
        event.preventDefault();
        setRegister({ ...register, loading: true, err: "" });
        axios.post("http://localhost:4000/auth/register", {
            name: register.fullName,
            email: register.email,
            password: register.password,
        }).then((resp) => {
            setAuthUser(resp.data);
            // const auth = getAuthUser();
            setRegister({ ...register, loading: false, err: "" });
            // navigate("/login");
            navigate("/home");
        }).catch((errors) => {
            console.log(errors);
            // setRegister({...register , loading:false , err:"there were an error "})
            setRegister({ ...register, loading: false, err: errors.response.data.errors[0].msg })
        });
        if (register.password !== register.confirmPassword) {
            setRegister({ ...register, err: "Passwords Don't Match , Try again" })
        }
    }
    return (
        <div className='Register'>
            <div className="container">
                <div className="row">
                    <div className="col-md-7 Register-form">
                        <Form onSubmit={RegisterFun}>
                            <h2 className="Register-form-title">The Future In Your Hands </h2>
                            <p className="mb-4">Welcome. Please Fill all Fileds to Registeration</p>
                            {register.err && (
                                <div class="alert alert-danger text-center p-2" role="alert">{register.err}</div>
                            )}
                            <Form.Group className="Register-form-input-box" >
                                <Form.Control required type="text" placeholder="Full Name" value={register.fullName} onChange={(e) => setRegister({ ...register, fullName: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="Register-form-input-box" >
                                <Form.Control required type="email" placeholder="Email" value={register.email} onChange={(e) => setRegister({ ...register, email: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="Register-form-input-box" >
                                <Form.Control required type="password" placeholder="Password" value={register.password} onChange={(e) => setRegister({ ...register, password: e.target.value })} />
                                {/* <FaLock className='icon' /> */}
                            </Form.Group>
                            <Form.Group className="Register-form-input-box" >
                                <Form.Control required type="password" placeholder="Confirm Password" value={register.confirmPassword} onChange={(e) => setRegister({ ...register, confirmPassword: e.target.value })} />
                                {/* <FaLock className='icon' /> */}
                            </Form.Group>
                            <Button className="default-button border border-0 p-2 mt-3" variant="primary" type="submit"
                                disabled={register.fullName === "" || register.email === "" || register.password === "" ||
                                    register.confirmPassword === ""}>
                                Register
                            </Button>
                            <div className="Register-form-link">
                                <p>Already Have An Account ? <Link to="/login"> Login </Link></p>
                            </div>
                        </Form>
                    </div>
                    <div className="col-md-5 p-0 Register-form-img">
                        <img src={loginphoto} className="w-100" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register; 