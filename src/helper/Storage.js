

export const setAuthUser = (data) =>{
	// save object to localstorage 
    localStorage.setItem("user", JSON.stringify(data)); //stringfy (set object to text) 
};

export const getAuthUser = (data) =>{
   if(localStorage.getItem("user")){	//get user
    return JSON.parse(localStorage.getItem("user"));  //json from text to object
    }
};


export const removeAuthUser = () =>{
    if(localStorage.getItem("user")) localStorage.removeItem("user");
};