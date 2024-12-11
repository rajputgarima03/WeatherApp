import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import weatherReducer from './reducers/weatherReducers';
const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true, 
        }),
});

export default store;
