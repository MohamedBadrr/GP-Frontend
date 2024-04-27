import React, { useEffect, useRef, useState } from 'react';
import './User.css';
import axios from 'axios';
import { getAuthUser, setAuthUser } from '../../helper/Storage';

export default function User() {
  const auth = getAuthUser();
  const [user , setUser ] = useState({
    loading : false,
    data : [] ,
    err : []
  })
  
  useEffect(() => {
    if (auth) {
      setUser({...user , loading:true , err:[]});
      axios.get("http://localhost:4000/user/info",
      {
        headers:{
          token : auth.token
        }
      }).then((resp) =>{
        setUser({...user, data : resp.data , loading:false , err:""})
      }).catch((errors)=>{
          setUser({...user , loading:false , err:errors.response.data.errors[0].msg})
      });
    }
  }, [])
 const [updatedUser , setUpdatedUser ] = useState({
    name : "",
    email : '',
    password : '',
    photo : '',
    loading : false,
    err : null,
    reload: false,
    success: null,
  })
  const image = useRef(null)
  const userUpdate = (event)=>{
    event.preventDefault();
    setUpdatedUser({...updatedUser , loading:true , err:[]});
    const formData = new FormData();
    if (updatedUser.name !== "") {
      formData.append("name", updatedUser.name);
    }else{
      formData.append("name", user.data.name);
    }
    if (updatedUser.email !== "") {
      formData.append("email", updatedUser.email);
    }else{
      formData.append("email", user.data.email);
    }
    if (updatedUser.password !== "") {
      formData.append("password", updatedUser.password);
    }
    if (image.current.files && image.current.files[0]) {
        formData.append("photo", image.current.files[0]);
    }
    axios
        .put("http://localhost:4000/user/update", formData,{
            headers: {
                token: auth.token,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((resp) => {
          setUpdatedUser({
                ...updatedUser,
                loading: false,
                err:null,
                success: resp.data.msg,
                reload: updatedUser.reload + 1,
            });
        })
        .catch((err) => {
          console.log(err);
          setUpdatedUser({
                ...updatedUser,
                loading: false,
                success: null,
                err: err.response.data.errors[0].msg,
            });
        });
  }
  return (
    <>
      <div class="container-xl px-4 mt-10 user-section">
          <div class="row">
              <div class="col-xl-4">
                  {/* <!-- Profile picture card--> */}
                  <div class="card mb-4 mb-xl-0">
                      <div class="card-header">Profile Picture</div>
                      <div class="card-body text-center">
                          {/* <!-- Profile picture image--> */}
                          <img class="img-account-profile rounded-circle mb-2" src={user.data.photo} alt=""/>
                          {/* <!-- Profile picture help block--> */}
                          <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                          {/* <!-- Profile picture upload button--> */}
                          <input type='file' className='btn btn-primary b' ref={image}></input>
                          
                      </div>
                  </div>
              </div>
              <div class="col-xl-8">
                  {/* <!-- Account details card--> */}
                  <div class="card mb-4">
                      <div class="card-header">Account Details</div>
                      {updatedUser.err&&(
                            <div class="alert alert-danger text-center p-2" role="alert">{updatedUser.err}</div>
                        )}
                        {
                          updatedUser.success && (
                            <div class="alert alert-success text-center p-2" role="alert">{updatedUser.success}</div>
                          )
                        }
                      <div class="card-body">
                          <form onSubmit={userUpdate}>
                              {/* <!-- Form Group (username)--> */}
                              <div class="mb-3">
                                  <label class="small mb-1" >Username (how your name will appear on the site)</label>
                                <input class="form-control" id="inputUsername" type="text" placeholder={`${user.data.name}`}  value={updatedUser.name} onChange={(e)=>setUpdatedUser({...updatedUser, name: e.target.value})}/>
                              </div>
                              
                              {/* <!-- Form Group (email address)--> */}
                              <div class="mb-3">
                                  <label class="small mb-1" >Email address</label>
                                  <input class="form-control" id="inputEmailAddress" type="email" placeholder={`${user.data.email}`} value={updatedUser.email} onChange={(e)=>setUpdatedUser({...updatedUser, email: e.target.value})}/>
                              </div>
                              {/* <!-- Form Row--> */}
                              <div class="row gx-3 mb-3">
                                  {/* <!-- Form Group (password)--> */}
                                  <div class="col-md-6">
                                      <label class="small mb-1" >Password</label>
                                      <input class="form-control" id="inputPhone" type="password" placeholder="Enter your Password" value={updatedUser.password} required onChange={(e)=>setUpdatedUser({...updatedUser, password : e.target.value})}/>
                                  </div>
                                  
                              </div>
                              {/* <!-- Save changes button--> */}
                              <button class="btn btn-primary" type="submit" >Save changes</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}
