import { combineReducers } from 'redux';
import { MainPageReducer } from '../pages/MainPage/index.tsx';

const rootReducer = combineReducers({
    mainPage: MainPageReducer
});

export default rootReducer;