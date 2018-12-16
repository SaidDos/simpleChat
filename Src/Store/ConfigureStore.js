import {createStore, combineReducers, applyMiddleware} from 'redux' ;
import ReduxThunk from 'redux-thunk';
import ChatReducer from '../Store/Reducers/ChatReducer';
import LoginReducer from '../Store/Reducers/LoginReducer';

const rootReducer = combineReducers({
    chat:ChatReducer,
    login:LoginReducer
})

const configureStore=  createStore(rootReducer,applyMiddleware(ReduxThunk))
    
    
    export default configureStore;