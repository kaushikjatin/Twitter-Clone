import { UserActionTypes } from "./user.actions.types";

export const emailSignInStart=({email,password,history})=>({
    type:UserActionTypes.EmailSignInStart,
    payload:{email,password,history,}
})

export const signInSuccess = (response)=>({
    type:UserActionTypes.SignInSuccess,
    payload:response
})

export const emailSignUpStart=({email,password,firstName,lastName,userName,history})=>({
    type:UserActionTypes.EmailSignUpStart,
    payload:{email,password,firstName,lastName,userName,history}
})


export const signUpSuccess = (user)=>({
    type:UserActionTypes.SignUpSuccess,
    payload:user
})

export const signOut=()=>({
    type:UserActionTypes.SignOut
})

export const TweetUploadStart=(tweet,token)=>({
    type:UserActionTypes.TweetUploadStart,
    payload:{tweet,token}
})

export const TweetsFetchStart=(token)=>({
    type:UserActionTypes.TweetsFetchStart,
    payload:{token}
})

export const TweetsFetchSuccess=(tweets_list)=>({
    type:UserActionTypes.TweetsFetchSuccess,
    payload:{tweets_list}
})