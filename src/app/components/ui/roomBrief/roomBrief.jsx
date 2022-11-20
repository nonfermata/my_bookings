import React, { useState } from "react";
import classes from "./roomBrief.module.css";
import PropTypes from "prop-types";
import Button from "../../common/button";
import { NavLink } from "react-router-dom";
import heart from "../../common/heart";
import cross from "../../common/loader/cross";

const RoomBrief = ({
    _id,
    name,
    briefDescription,
    price,
    mainPhoto,
    isFavourite,
    handleFavouriteChange,
    parent
}) => {
    const [topButtonClass, setTopButtonClass] = useState(
        isFavourite && parent === "rooms"
            ? classes.topButton
            : classes.topButton + " hidden"
    );
    const showHeart = () => {
        setTopButtonClass(classes.topButton);
    };
    const hideHeart = () => {
        if (!isFavourite || parent === "favourites") {
            setTopButtonClass(classes.topButton + " hidden");
        }
    };
    const getTopButton = () => {
        if (parent === "rooms") {
            return isFavourite ? heart.filled : heart.contoured;
        } else if (parent === "favourites") {
            return cross;
        }
    };
    const getTopButtonTitle = () => {
        if (parent === "favourites") {
            return "Удалить из Избранного";
        } else return null;
    };

    return (
        <div
            className={classes.roomWrap}
            onMouseOver={showHeart}
            onMouseLeave={hideHeart}
        >
            <button
                className={topButtonClass}
                title={getTopButtonTitle()}
                onClick={() => {
                    handleFavouriteChange(_id);
                }}
            >
                {getTopButton()}
            </button>
            <div className={classes.imgWrap}>
                <img
                    className={classes.image}
                    src={mainPhoto}
                    alt="Photo"
                />
            </div>
            <h1>{name}</h1>
            <ul className={classes.briefDescriptionList}>
                {briefDescription.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <div className={classes.price}>${price}</div>
            <div className={classes.goToNumberBtn}>
                <Button color="blue">
                    <NavLink to={"/rooms/" + _id}>Посмотреть</NavLink>
                </Button>
            </div>
        </div>
    );
};

RoomBrief.propTypes = {
    name: PropTypes.string,
    mainPhoto: PropTypes.string,
    briefDescription: PropTypes.array,
    price: PropTypes.number,
    _id: PropTypes.string,
    isFavourite: PropTypes.bool,
    handleFavouriteChange: PropTypes.func,
    parent: PropTypes.string
};

export default RoomBrief;
