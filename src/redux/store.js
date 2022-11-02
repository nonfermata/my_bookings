import { createStore } from "redux";
import RoomsReducer from "./roomsReducer";

const store = createStore(RoomsReducer);

export default store;
