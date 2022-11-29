const initialState = [];

const setRooms = "SET_ROOMS_TO_STORE";
const isFavouriteCng = "IS_FAVOURITE_CHANGE";

export const setRoomsToStore = (rooms) => ({
    type: setRooms,
    rooms
});

export const isFavouriteChange = (id) => ({
    type: isFavouriteCng,
    id
});

const roomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case setRooms:
            return [...action.rooms];
        case isFavouriteCng:
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
