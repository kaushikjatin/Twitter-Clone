import { UserDashboardActionTypes } from "./UserDashboard.action.types";

const inital_state={
    users_list:[]
}

const UserDashboardReducer=(state=inital_state,action)=>{
    switch(action.type){
        case UserDashboardActionTypes.FetchUsersSuccess:
            return{
                ...state,
                users_list:action.payload
            }
        default:
            return{
                ...state
            }
    }
}

export default UserDashboardReducer;