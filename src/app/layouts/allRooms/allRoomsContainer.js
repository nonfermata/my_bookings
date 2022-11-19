import { connect } from "react-redux";
import { isFavouriteChangeAC } from "../../../redux/roomsReducer";
import AllRooms from "./allRooms";

const mapStateToProps = ({ roomsState }) => ({
    roomsState
});

const mapDispatchToProps = (dispatch) => ({
    isFavouriteChange: (id) => {
        dispatch(isFavouriteChangeAC(id));
    }
});

const AllRoomsContainer = connect(mapStateToProps, mapDispatchToProps)(AllRooms);

export default AllRoomsContainer;
