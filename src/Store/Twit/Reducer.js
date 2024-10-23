import { reTwit } from "./Action";
import { CREATE_TWIT_FAILURE, CREATE_TWIT_REQUEST, CREATE_TWIT_SUCCESS, DELETE_TWIT_FAILURE, DELETE_TWIT_REQUEST, DELETE_TWIT_SUCCESS, FIND_TWIT_BY_ID_FAILURE, FIND_TWIT_BY_ID_REQUEST, FIND_TWIT_BY_ID_SUCCESS, GET_ALL_TWIT_SUCCESS, GET_USERS_TWIT_SUCCESS, LIKE_TWIT_FAILURE, LIKE_TWIT_REQUEST, LIKE_TWIT_SUCCESS, REPLY_TWIT_SUCCESS, RETWIT_FAILURE, RETWIT_REQUEST, RETWIT_SUCCESS, USER_LIKE_TWIT_FAILURE, USER_LIKE_TWIT_REQUEST, USER_LIKE_TWIT_SUCCESS } from "./ActionType"

const initialState={
    loading:false,
    error:null,
    twits:[],
    twit:null,
    reTwit:null,
    data:null,
    likedTwits:[],
    likedTwit:null
}

export const twitReducer=(state=initialState,action)=>{
  switch(action.type){
    case CREATE_TWIT_REQUEST:
    case DELETE_TWIT_REQUEST:
    case USER_LIKE_TWIT_REQUEST:
    case LIKE_TWIT_REQUEST:
    case RETWIT_REQUEST:
    case FIND_TWIT_BY_ID_REQUEST:
        return {...state,loading:true,error:null};


    case CREATE_TWIT_SUCCESS:
        return {...state,loading:false,error:null,twits:[action.payload,...state.twits]};
        
    case GET_ALL_TWIT_SUCCESS:
    case GET_USERS_TWIT_SUCCESS:
        return {...state,loading:false,error:null,twits:action.payload};    
        
    case FIND_TWIT_BY_ID_SUCCESS:
    case REPLY_TWIT_SUCCESS:
        return {...state,loading:false,error:null,twit:action.payload};       

    case USER_LIKE_TWIT_SUCCESS:
        return {...state,loading:false,error:null,likedTwits:action.payload};          

    case LIKE_TWIT_SUCCESS:
        return {...state,loading:false,error:null,likedTwit:action.payload}; 
        
    case DELETE_TWIT_SUCCESS:
        return {...state,loading:false,error:null,twits:state.twits.filter((twit)=>twit.id!==action.payload)};  
        
    case RETWIT_SUCCESS:
        return {...state,loading:false,error:null,reTwit:action.payload};  


    case CREATE_TWIT_FAILURE:
    case DELETE_TWIT_FAILURE:
    case USER_LIKE_TWIT_FAILURE:
    case LIKE_TWIT_FAILURE:
    case RETWIT_FAILURE:
    case FIND_TWIT_BY_ID_FAILURE:   
         return {...state,loading:false,error:action.payload}; 
    
    default: return state;    
  }
}