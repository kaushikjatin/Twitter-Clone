import {UserDashboardActionTypes} from './UserDashboard.action.types';

export const FetchUsersStart=(currentUser_id,token)=>({
    type:UserDashboardActionTypes.FetchUsersStart,
    payload:{token,currentUser_id}
})

export const FetchUsersSuccess=(users_list)=>({
    type:UserDashboardActionTypes.FetchUsersSuccess,
    payload:users_list
})

export const ToggleFollowUser=(token,celeb_id,currentUser_id)=>({
    type:UserDashboardActionTypes.ToggleFollowUser,
    payload:{token,celeb_id,currentUser_id}
})