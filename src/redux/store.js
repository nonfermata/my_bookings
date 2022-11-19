import { combineReducers, createStore } from "redux";
import roomsReducer from "./roomsReducer";
import bookingReducer from "./bookingReducer";

const reducers = combineReducers({
    rooms: roomsReducer,
    bookingState: bookingReducer
});

const store = createStore(reducers);

export default store;
