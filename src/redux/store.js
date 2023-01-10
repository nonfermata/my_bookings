import { combineReducers, createStore } from "redux";
import bookingReducer from "./bookingReducer";
import onMainClickReducer from "./onMainClickReducer";

const reducers = combineReducers({
    booking: bookingReducer,
    onMainClick: onMainClickReducer
});

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
