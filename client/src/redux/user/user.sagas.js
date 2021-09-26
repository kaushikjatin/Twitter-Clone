import {takeEvery,all,call,put} from 'redux-saga/effects';
import { UserActionTypes } from './user.actions.types';
import {signInSuccess,signUpSuccess,TweetsFetchSuccess} from './user.actions';
import { setSignInPageAlert ,setSignUpPageAlert} from '../Alerts/Alert.Actions';
import axios from 'axios';


function* emailSignInHandler({payload}){
    try{
        const response=yield axios({
            method: 'post',
            url: '/user/auth/signin',
            data: {email:payload.email,password:payload.password}
        })
        yield put(signInSuccess(response.data));
        yield put(setSignInPageAlert({state:true,message:'Signed In Successfully!'}))
        payload.history.push('/');
    }catch(error){
        yield put(setSignInPageAlert({state:true,message:error.response.data.message}));
    }
}

function* emailSignUpHandler({payload}){
    try{
        const response=yield axios({
            method: 'post',
            url: '/user/auth/signup',
            data: {email:payload.email,password:payload.password,firstName:payload.firstName,lastName:payload.lastName,userName:payload.userName}
        })
        yield put(signUpSuccess(response.data));
        payload.history.push('/');
    }catch(error){
        yield put(setSignUpPageAlert({state:true,message:error.response.data.message}));
    }
}

function* TweetUploadHandler({payload}){
    try{
        const token=payload.token;
        const headers={'authorization':token}
        const response=yield axios({
            method: 'post',
            url: '/user/post_tweet',
            data: {tweet:payload.tweet},
            headers:headers
        })
        console.log("Made a tweet request");
        
    }catch(error)
    {
       console.log(error);
    }
}

function* TweetsFetchHandler({payload}){
    try{
        const token=payload.token;
        const headers={'authorization':token}
        const response=yield axios({
            method: 'get',
            url: '/user/all_tweets',
            headers:headers
        })
        if(response.data.tweets_list==null)
        {
            console.log("Null retuned")
        }else{
            console.log(response.data.tweets_list)
            yield put(TweetsFetchSuccess(response.data.tweets_list));
        }
    }catch(error){
        console.log(error);
    }
}

 function* EmailSignInStart(){
   yield takeEvery(UserActionTypes.EmailSignInStart,emailSignInHandler);
}

function* EmailSignUpStart(){
    yield takeEvery(UserActionTypes.EmailSignUpStart,emailSignUpHandler);
}

function* TweetUploadStartSaga(){
    yield takeEvery(UserActionTypes.TweetUploadStart,TweetUploadHandler);
}

function* TweetsFetchStartSaga(){
    yield takeEvery(UserActionTypes.TweetsFetchStart,TweetsFetchHandler);
}
export function* rootUserSaga(){
    yield all([call(EmailSignInStart),call(EmailSignUpStart),call(TweetUploadStartSaga),call(TweetsFetchStartSaga)]);
}