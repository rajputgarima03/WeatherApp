import axios from 'axios';

const API_KEY = '5d86a0463fd941aaa6f164346240812';
export const FETCH_WEATHER = 'FETCH_WEATHER';
export const FETCH_AUTOSUGGEST = 'FETCH_AUTOSUGGEST';
export const FETCH_FORECAST = 'FETCH_FORECAST';
export const SET_ERROR = 'SET_ERROR';

export const fetchWeather = (city) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
        );
        dispatch({ type: FETCH_WEATHER, payload: response.data });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

export const fetchAutoSuggest = (city) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${city}`
        );
        dispatch({ type: FETCH_AUTOSUGGEST, payload: response.data });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};


export const fetchForecast = (city, days = 3) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}`
        );
        dispatch({ type: FETCH_FORECAST, payload: response.data });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};
