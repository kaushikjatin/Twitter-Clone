import {UserActionTypes} from './user.actions.types'

const initial_state={
    currentUser:null,
    token:null,
    time:null,
    currentUser_id:null,
    tweets_list:[]
}

const userReducer =(state=initial_state,action)=>{
    switch(action.type){
        case UserActionTypes.SignInSuccess:
            return{
                ...state,
                currentUser:action.payload.firstName,
                token:action.payload.token,
                time:new Date(),
                currentUser_id:action.payload.user_id,
                tweets_list:[]
            }
        case UserActionTypes.SignUpSuccess:
            return{
                ...state,
                currentUser:action.payload.firstName,
                token:action.payload.token,
                time:new Date(),
                currentUser_id:action.payload.user_id,
                tweets_list:[]
            }
        case UserActionTypes.SignOut:
            return{
                ...state,
                currentUser:null,
                token:null,
                time:null,
                currentUser_id:null,
                tweets_list:[]
            }
        case UserActionTypes.TweetsFetchSuccess:
            return {
                ...state,
                tweets_list:action.payload.tweets_list
            }
        default:
            return state;
    }
}

export default userReducer;
