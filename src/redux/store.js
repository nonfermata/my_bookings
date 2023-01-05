import { combineReducers, createStore } from "redux";
import bookingReducer from "./bookingReducer";
import onMainClickReducer from "./onMainClickReducer";

const reducers = combineReducers({
    booking: bookingReducer,
    onMainClick: onMainClickReducer
});

const store = createStore(reducers);

export default store;
