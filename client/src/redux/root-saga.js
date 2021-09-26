import { call,all } from "redux-saga/effects";
import { rootUserSaga} from "./user/user.sagas";
import { rootUserDashboardSaga } from "./UserDashboard/UserDashboard.sagas";


export  default function* rootSaga(){
    yield all([call(rootUserSaga),call(rootUserDashboardSaga)]);
}