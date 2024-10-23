import { FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAILURE, LOGOUT_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_USER_SUCCESS } from "./ActionType"

const initialState={
    user:null,
    findUser:null,
    loading:false,
    error:null,
    jwt:null,
    updateUser:false
}

export const authReducer=(state=initialState,action)=>{

    switch(action.type){

        case LOGIN_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case GET_USER_REQUEST:
            return {...state,loading:true,error:null};        

        case LOGIN_USER_SUCCESS:
            return {...state,loading:false,error:null,jwt:action.payload}
        case REGISTER_USER_SUCCESS:    
            return {...state,loading:false,error:null,jwt:action.payload}

        case GET_USER_SUCCESS:    
            return {...state,loading:false,error:null,user:action.payload}  

        case LOGOUT_USER_SUCCESS:
            return initialState;
            

        case FIND_USER_BY_ID_SUCCESS:
            return {...state,loading:false,error:null,findUser:action.payload}     

        case FOLLOW_USER_SUCCESS:
            return {...state,loading:false,error:null,findUser:action.payload}     
            
        case UPDATE_USER_SUCCESS:
            return {...state,loading:false,error:null,findUser:action.payload,updateUser:true}        
            
        case LOGIN_USER_FAILURE:
        case REGISTER_USER_FAILURE:
        case GET_USER_FAILURE:
        case LOGOUT_USER_FAILURE:
            return {...state,loading:false,error:action.payload}                
        
        default:
            return state;    
    }
}