import {combineReducers} from 'redux'
import userReducer from './user/user.reducer'
import AlertReducer from './Alerts/Alert.reducer'
import UserDashboardReducer from './UserDashboard/UserDashboard.reducer'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig={
    key:'root',
    storage,
    whitelist:['user']
}

const rootReducer= combineReducers({
    user:userReducer,
    alert:AlertReducer,
    all_users:UserDashboardReducer
})

const PersistReducer=persistReducer(persistConfig,rootReducer);
export default PersistReducer;