import { useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import emailjs from "@emailjs/browser";

function ForgetPassword() {
    const navigate = useNavigate();
    const [ email , setemail ] = useState({
        loading : false,
        email : '',
        error : '',
    })

    const handleSubmit = (event)=>{
        event.preventDefault();
        setemail({ ...email, loading: true, error: '' });
        axios.post("http://localhost:4000/user/forget-password", {
            email: email.email,
        }).then((resp) => {
            emailjs.send(
                "service_3fck9er",
                "template_zmdxurr",
                {
                  to_name: resp.data.name ,
                  message: `Link : http://localhost:3000/ResetPassword?token=${resp.data.token}`,
                  from_name: "End Game Team",
                  to_email: resp.data.email,
                },
                'st06NduHZrq5VwrNL'
              ).then(()=>{
                setemail({ ...email, loading: false, error: "" });
                alert(resp.data.msg);
                navigate('/login')
                },(error)=>{
                    setemail({ ...email, loading: false, error: error });        })
        },(error)=>{
            setemail({
                ...email, loading: false,
                error: error.response.data.errors[0].msg
            })
        })
        
    }
  return (
    <div className='main-section'>
        <div>
            <h3 className='forget-head'>We will send you message to this email <br/> to reset your password </h3>
        </div>
      <form  className='forget-form' onSubmit={handleSubmit}>
        <label className='forget-label'>
            Enter your Email 
        </label>
        {(email.error) && 
        <label  className='forget-error-label'>
            {email.error}
        </label>
        }
        <input type="email" required className='froget-input' value={email.email} onChange={(e)=>(setemail({...email, email : e.target.value ,error : '' }))}/>
        <button className="default-button border border-0" variant="primary" type="submit" >
            send
        </button>
      </form>
    </div>
  )
}

export default ForgetPassword
