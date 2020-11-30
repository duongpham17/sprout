import {combineReducers} from 'redux';
import alertReducers from './alertReducers';
import authReducers from './authReducers';
import userReducers from './userReducers';
import productReducers from './productReducers';
import reviewReducers from './reviewReducers';
import followReducers from './followReducers';
import ticketReducers from './ticketReducers';
import adminReducers from './adminReducers';
import statsReducers from './statsReducers';

export default combineReducers({
    alertReducers,
    authReducers,
    userReducers,
    productReducers,
    reviewReducers,
    followReducers,
    ticketReducers,
    adminReducers,
    statsReducers,
});
