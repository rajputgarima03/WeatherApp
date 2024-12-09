import { FETCH_WEATHER,FETCH_AUTOSUGGEST, FETCH_FORECAST, SET_ERROR } from '../actions/weatherActions';

const initialState = {
    currentWeather: null,
    autosuggest: null,
    forecast: null,
    error: null,
};

export default function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_WEATHER:
            return { ...state, currentWeather: action.payload, error: null };
        case FETCH_AUTOSUGGEST:
             return { ...state, autosuggest: action.payload, error: null}
        case FETCH_FORECAST:
            return { ...state, forecast: action.payload, error: null };
        case SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}
