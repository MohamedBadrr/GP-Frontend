import axios from "axios";

export const setAuthUser = (data) =>{
	// save object to localstorage 
    localStorage.setItem("user", JSON.stringify(data)); //stringfy (set object to text) 
};

export const getAuthUser = (data) =>{
   if(localStorage.getItem("user")){	//get user
    return JSON.parse(localStorage.getItem("user"));  //json from text to object
    }
};

export const updateAuthUser = (token) =>{
    let user ;
    axios.get("http://localhost:4000/user/info",
      {
        headers:{
          token : token
        }
      }).then((resp) =>{
          user = resp.data
          localStorage.setItem("user", JSON.stringify(user));
      }).catch((errors)=>{
          console.log(errors);
      });
          
}
export const removeAuthUser = () =>{
    if(localStorage.getItem("user")) localStorage.removeItem("user");
};