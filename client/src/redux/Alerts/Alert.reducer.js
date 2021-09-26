import { AlertActionTypes } from "./Alerts.Actions.types";

const initial_state={
    signInPageInfo:{state:false,message:''},
    signUpPageInfo:{state:false,message:''}
}

const AlertReducer=(state=initial_state,action)=>{
    switch(action.type){
        case AlertActionTypes.setSignInPageAlert:
            return{
                ...state,
                signInPageInfo:action.payload
            }
        case AlertActionTypes.setSignUpPageAlert:
            return{
                ...state,
                signUpPageInfo:action.payload
            }
        default:
            return state;
        
    }
}

export default AlertReducer;
