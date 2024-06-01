import { useState } from 'react'
import './style.css'
import show from '../../assets/icons/view.png'
import hide from '../../assets/icons/hide.png'
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
function ResetPassword() {
    const [password , setPassword ] = useState({
        loading : false,
        password : '',
        confirmPassword : '',
        errors : '',
        passwordToggle : false,
        comfermPasswordToggle : false,
    });
    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const handleSubmit = (event)=>{
        event.preventDefault();
        if (password.password !== password.confirmPassword) {
            setPassword({...password , errors : 'Please enter correct conferm pasword'})
        }else{
            const token = queryParameters.get("token");
            axios.put("http://localhost:4000/user/reset-password", {
                password: password.password,
                token : token
                }).then((resp) => {
                    setPassword({ ...password, loading: false, error: "" });
                    alert('Your Password updated sucssesfuly');
                    navigate('/login')
                },(error)=>{
                    setPassword({
                        ...password, loading: false,
                        error: error.response.data.errors[0].msg
                    })
                })
        }

    }
  return (
    <div className='main-section'>
      <div>
            <h3 className='forget-head'>Enter your new password  </h3>
        </div>
      <form  className='forget-form' onSubmit={handleSubmit}>
      {(password.errors) && 
        <label  className='forget-error-label'>
            {password.errors}
        </label>
        }
        <label className='forget-label'>
            New password 
        </label>
        <div>
            <input type={!password.passwordToggle ? 'password' : 'text' } required className='froget-input' value={password.password} onChange={(e)=>(setPassword({...password, password : e.target.value ,errors : '' }))}/>
            <span className='reset-icon' onClick={()=>(setPassword({...password , passwordToggle : !password.passwordToggle}))}>{
                (!password.passwordToggle) ? (<img src={show}  />) : (<img src={hide}  />)
            }</span>
        </div>        <label className='forget-label'>
        confirm passsword
        </label>
        <div>
            <input type={!password.comfermPasswordToggle ? 'password' : 'text' } required className='froget-input' value={password.confirmPassword} onChange={(e)=>(setPassword({...password, confirmPassword : e.target.value ,errors : '' }))}/>
            <span className='reset-icon' onClick={()=>(setPassword({...password , comfermPasswordToggle : !password.comfermPasswordToggle}))}>{
                (!password.comfermPasswordToggle) ? (<img src={show}  />) : (<img src={hide}  />)
            }</span>
        </div>
        
        <button className="default-button border border-0" variant="primary" type="submit" >
            send
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
