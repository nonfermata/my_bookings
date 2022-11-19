import { connect } from "react-redux";
import AllRooms from "./allRooms";
import { isFavouriteChangeAC } from "../../../redux/roomsReducer";

const mapStateToProps = (state) => ({
    roomsState: state.roomsState
});

const mapDispatchToProps = (dispatch) => ({
    isFavouriteChange: (id) => {
        dispatch(isFavouriteChangeAC(id));
    }
});

const AllRoomsContainer = connect(mapStateToProps, mapDispatchToProps)(AllRooms);

export default AllRoomsContainer;
