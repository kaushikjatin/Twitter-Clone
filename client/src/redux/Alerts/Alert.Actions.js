import { AlertActionTypes } from "./Alerts.Actions.types"

export const setSignInPageAlert=(payload)=>({
    type:AlertActionTypes.setSignInPageAlert,
    payload:payload
})

export const setSignUpPageAlert=(payload)=>({
    type:AlertActionTypes.setSignUpPageAlert,
    payload:payload
})

