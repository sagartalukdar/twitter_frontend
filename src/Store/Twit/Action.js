import { api } from "../../Config/Api"
import { CREATE_TWIT_FAILURE, CREATE_TWIT_SUCCESS, DELETE_TWIT_FAILURE, DELETE_TWIT_SUCCESS, FIND_TWIT_BY_ID_FAILURE, FIND_TWIT_BY_ID_SUCCESS, GET_ALL_TWIT_FAILURE, GET_ALL_TWIT_REQUEST, GET_ALL_TWIT_SUCCESS, GET_USERS_TWIT_FAILURE, GET_USERS_TWIT_SUCCESS, LIKE_TWIT_FAILURE, LIKE_TWIT_SUCCESS, REPLY_TWIT_FAILURE, REPLY_TWIT_SUCCESS, RETWIT_FAILURE, RETWIT_SUCCESS, USER_LIKE_TWIT_FAILURE, USER_LIKE_TWIT_SUCCESS } from "./ActionType";


export const getAllTweets=()=>async(dispatchEvent)=>{
  try {
    const {data}=await api.get("/api/twits/");
    console.log("get all twits :",data);
    dispatchEvent({type:GET_ALL_TWIT_SUCCESS,payload:data});
  } catch (error) {
    console.log("get all twits error :",error);
    dispatchEvent({type:GET_ALL_TWIT_FAILURE,payload:error.message});
  }
}

export const getAllUserTweets=(userId)=>async(dispatchEvent)=>{
    try {
      const {data}=await api.get(`/api/twits/user/${userId}`);
      console.log("get all user twits :",data);
      dispatchEvent({type:GET_USERS_TWIT_SUCCESS,payload:data});
    } catch (error) {
      console.log("get all user twits error :",error);
      dispatchEvent({type:GET_USERS_TWIT_FAILURE,payload:error.message});
    }
}

export const findTwitsByLikeContainUser=(userId)=>async(dispatchEvent)=>{
  try {
    const {data}=await api.get(`/api/twits/user/${userId}/likes`);
    console.log(" user like twits :",data);
    dispatchEvent({type:USER_LIKE_TWIT_SUCCESS,payload:data});
  } catch (error) {
    console.log("user like twits error :",error);
    dispatchEvent({type:USER_LIKE_TWIT_FAILURE,payload:error.message});
  }
}

export const findTwitsById=(twitId)=>async(dispatchEvent)=>{
  try {
    const {data}=await api.get(`/api/twits/${twitId}`);
    console.log("find twit by id :",data);
    dispatchEvent({type:FIND_TWIT_BY_ID_SUCCESS,payload:data});
  } catch (error) {
    console.log("find twit by id error :",error);
    dispatchEvent({type:FIND_TWIT_BY_ID_FAILURE,payload:error.message});
  }
}

export const createTwit=(twitData)=>async(dispatchEvent)=>{
  try {
    const {data}=await api.post(`/api/twits/create`,twitData);
    console.log("created twit :",data);
    dispatchEvent({type:CREATE_TWIT_SUCCESS,payload:data});
  } catch (error) {
    console.log("created twit error :",error);
    dispatchEvent({type:CREATE_TWIT_FAILURE,payload:error.message});
  }
}

export const replyTwit=(twitData)=>async(dispatchEvent)=>{
  try {
    const {data}=await api.post(`/api/twits/reply`,twitData);
    console.log("reply twit :",data);
    dispatchEvent({type:REPLY_TWIT_SUCCESS,payload:data});
  } catch (error) {
    console.log("reply twit error :",error);
    dispatchEvent({type:REPLY_TWIT_FAILURE,payload:error.message});
  }
}

export const reTwit=(twitId)=>async(dispatchEvent)=>{
  try {
    const {data}=await api.put(`/api/twits/${twitId}/retwit`);
    console.log("reTwit twit :",data);
    dispatchEvent({type:RETWIT_SUCCESS,payload:data});
  } catch (error) {
    console.log(" reTwit error :",error);
    dispatchEvent({type:RETWIT_FAILURE,payload:error.message});
  }
}

export const likeTwit=(twitId)=>async(dispatchEvent)=>{
  try {
    const {data}=await api.post(`/api/${twitId}/like`);
    console.log("like twit :",data);
    dispatchEvent({type:LIKE_TWIT_SUCCESS,payload:data});
  } catch (error) {
    console.log(" like twit error :",error);
    dispatchEvent({type:LIKE_TWIT_FAILURE,payload:error.message});
  }
}

export const deleteTwit=(twitId)=>async(dispatchEvent)=>{
  try {
    const {data}=await api.delete(`/api/twits/${twitId}`);
    console.log("delete twit :",data);
    dispatchEvent({type:DELETE_TWIT_SUCCESS,payload:twitId});
  } catch (error) {
    console.log(" delete twit error :",error);
    dispatchEvent({type:DELETE_TWIT_FAILURE,payload:error.message});
  }
}
