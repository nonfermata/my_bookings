import { combineReducers, createStore } from "redux";
import roomsReducer from "./roomsReducer";
import bookingReducer from "./bookingReducer";
import onMainClickReducer from "./onMainClickReducer";

const reducers = combineReducers({
    rooms: roomsReducer,
    booking: bookingReducer,
    onMainClick: onMainClickReducer
});

const store = createStore(reducers);

export default store;
