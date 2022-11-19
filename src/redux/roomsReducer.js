const initialState = [];

const setRoomsToState = "SET_ROOMS_TO_STATE";
const isFavouriteChange = "IS_FAVOURITE_CHANGE";

export const setRoomsToStateAC = (rooms) => ({
    type: setRoomsToState,
    rooms
});

export const isFavouriteChangeAC = (id) => ({
    type: isFavouriteChange,
    id
});

const roomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case setRoomsToState:
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
