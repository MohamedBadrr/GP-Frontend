import React ,{useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../pages/Login/Login.css'
import { Link } from 'react-router-dom';
import loginphoto from '../../assets/images/pngwing.png'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from "../../helper/Storage";

const Login = () => {
    const navigate= useNavigate(); 
    const [login ,setLogin] = useState({
        email:'',
        password:'',
        loading : false,
        errors:null,
        });
        const LoginFun = (event)=>{
        event.preventDefault();
        console.log(login);
        setLogin({...login , loading:true , err:[]});
        axios.post("http://localhost:4000/auth/login",{
            email:login.email,
            password:login.password,
        }).then((resp) =>{
            setAuthUser(resp.data); 
            // const auth = getAuthUser();
            setLogin({...login , loading:false , err:""});
            navigate("/home");
        }).catch((errors)=>{
            console.log(errors);
            // setLogin({...login , loading:false , err:"Email or Password is not correct ..!"})
            setLogin({...login , loading:false , errors:errors.response.data.errors[0].msg})
        });
        }
    return (
        
        <div className='login '>
            <div className="container">
            <div className="row">
            <div className="col-md-6 loginform">
            <Form  onSubmit={LoginFun}>
            <h2 className="mb-3 edit logintitle">The Future In Your Hands </h2>
            <p className="mb-3">Welcome Back. Please Login To Your Account</p>
            {login.errors&&(
                <div class="alert alert-danger text-center p-2" role="alert">{login.errors}</div>
            )}
                <Form.Group className="input-box" >
                    <Form.Control required type="email" placeholder="Username"  value={login.email} onChange={(e)=>setLogin({...login, email: e.target.value})} />
                </Form.Group>
                <Form.Group className="input-box" >
                    <Form.Control required type="password" placeholder="Password"  value={login.password} onChange={(e)=>setLogin({...login, password: e.target.value})}/>
                </Form.Group>
                <div className="remember">
                    <label className="text-white"><input type="checkbox"/> Remember Me</label>
                    <a href="/">Forgot Password ?</a>
                </div>
                <Button className="d-button border border-0" variant="primary" type="submit" disabled={login.email === "" || login.password === ""}>
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