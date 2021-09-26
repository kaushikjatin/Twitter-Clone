import {put, call, all, takeEvery} from 'redux-saga/effects';
import { UserDashboardActionTypes } from './UserDashboard.action.types';
import { FetchUsersSuccess,FetchUsersStart } from './UserDashboard.actions';
import axios from 'axios';


function* FetchUsersHandler({payload}){
    try{
        const token=payload.token;
        const headers={'authorization':token}
        const response=yield axios({
            method: 'get',
            url: '/user/all_users',
            headers:headers
        })
        if(response.data.users==null)
        {
            console.log(response.data.message);
        }else{
            const users_list=response.data.users.filter(user=>user.user_id!=payload.currentUser_id);
            yield put(FetchUsersSuccess(users_list));
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

function* ToggleFollowUserHandler({payload}){
    try{
        const token=payload.token;
        const headers={'authorization':token}
        const response=yield axios({
            method: 'get',
            url: '/user/follow_request/'+payload.celeb_id,
            headers:headers
        })
        if(response.data.message=='Internal Server Error')
        {
            console.log(response.data.message);
        }else{
            yield put(FetchUsersStart(payload.currentUser_id,payload.token));
        }
    }catch(err){
        console.log(err);
    }
}

function* FetchUsersStartSaga(){
    yield takeEvery(UserDashboardActionTypes.FetchUsersStart,FetchUsersHandler);
}

function* ToggleFollowUserSaga(){
    yield takeEvery(UserDashboardActionTypes.ToggleFollowUser,ToggleFollowUserHandler);
}

export function* rootUserDashboardSaga(){
    yield all([call(FetchUsersStartSaga),call(ToggleFollowUserSaga)]);
}