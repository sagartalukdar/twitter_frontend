import axios from "axios"
import { api_base_url } from "../../Config/Api"
import { GET_USER_FAILURE, GET_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER_FAILURE, LOGOUT_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS } from "./ActionType";
import { api } from "../../Config/Api";
import { FIND_USER_BY_ID_FAILURE, FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS } from "./ActionType";


export const loginUser=(loginData)=>async(dispatchEvent)=>{
    try {
        const {data}=await axios.post(`${api_base_url}/auth/signin`,loginData);
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
            dispatchEvent({type:LOGIN_USER_SUCCESS,payload:data.jwt});
            console.log("login action :",data);
        }       
    } catch (error) {
        console.log(error);
        dispatchEvent({type:LOGIN_USER_FAILURE,payload:error.message});
    }
}

export const registerUser=(registerData)=>async(dispatchEvent)=>{
    try {
        const {data}=await axios.post(`${api_base_url}/auth/signup`,registerData);
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
            dispatchEvent({type:REGISTER_USER_SUCCESS,payload:data.jwt});
            console.log("register action :",data);
        }       
    } catch (error) {
        console.log(error);
        dispatchEvent({type:REGISTER_USER_FAILURE,payload:error.message});
    }
}



export const getUserProfile=(jwt)=>async(dispatchEvent)=>{
    try {
        const {data}=await axios.get(`${api_base_url}/api/users/profile`,
           { headers:{
                "Authorization":`Bearer ${jwt}`
            }}
        );
        dispatchEvent({type:GET_USER_SUCCESS,payload:data});
        console.log("get user action :",data);
    } catch (error) {
        console.log(error);
        dispatchEvent({type:GET_USER_FAILURE,payload:error.message});
    }
}

export const logoutAction=()=>async(dispatchEvent)=>{
  localStorage.removeItem("jwt");
  dispatchEvent({type:LOGOUT_USER_SUCCESS,payload:null});
}


export const findUserById=(userId)=>async(dispatchEvent)=>{
    try {
      const {data}=await api.get(`/api/users/${userId}`);
      console.log("find user by id :",data);
      dispatchEvent({type:FIND_USER_BY_ID_SUCCESS,payload:data});
    } catch (error) {
      console.log("find user by id error :",error);
      dispatchEvent({type:FIND_USER_BY_ID_FAILURE,payload:error.message});
    }
  }

  export const updateUser=(reqData)=>async(dispatchEvent)=>{
    try {
      const {data}=await api.put(`/api/users/update`,reqData);
      console.log("update user :",data);
      dispatchEvent({type:UPDATE_USER_SUCCESS,payload:data});
    } catch (error) {
      console.log("update user error :",error);
      dispatchEvent({type:UPDATE_USER_FAILURE,payload:error.message});
    }
  }

  export const followUser=(userId)=>async(dispatchEvent)=>{
    try {
      const {data}=await api.put(`/api/users/${userId}/follow`);
      console.log("follow user :",data);
      dispatchEvent({type:FOLLOW_USER_SUCCESS,payload:data});
    } catch (error) {
      console.log("follow user error :",error);
      dispatchEvent({type:FOLLOW_USER_FAILURE,payload:error.message});
    }
  }
