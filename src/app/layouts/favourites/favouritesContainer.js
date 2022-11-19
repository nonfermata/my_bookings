import { connect } from "react-redux";
import { isFavouriteChangeAC } from "../../../redux/roomsReducer";
import Favourites from "./favourites";

const mapStateToProps = (state) => ({
    roomsState: state.roomsState
});

const mapDispatchToProps = (dispatch) => ({
    isFavouriteChange: (id) => {
        dispatch(isFavouriteChangeAC(id));
    }
});

const FavouritesContainer = connect(mapStateToProps, mapDispatchToProps)(Favourites);

export default FavouritesContainer;
