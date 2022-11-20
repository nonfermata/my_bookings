const initialState = [];

const setRoomsToStore = "SET_ROOMS_TO_STORE";
const isFavouriteChange = "IS_FAVOURITE_CHANGE";

export const setRoomsToStoreAC = (rooms) => ({
    type: setRoomsToStore,
    rooms
});

export const isFavouriteChangeAC = (id) => ({
    type: isFavouriteChange,
    id
});

const roomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case setRoomsToStore:
            return [...action.rooms];
        case isFavouriteChange:
            return state.map((room) => {
                if (room._id === action.id) {
                    room.isFavourite = !room.isFavourite;
                }
                return room;
            });
        default:
            return state;
    }
};

export default roomsReducer;
