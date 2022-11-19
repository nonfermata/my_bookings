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
    const [heartClass, setHeartClass] = useState(
        isFavourite && parent === "allRooms"
            ? classes.heart
            : classes.heart + " hidden"
    );
    const showHeart = () => {
        setHeartClass(classes.heart);
    };
    const hideHeart = () => {
        if (!isFavourite || parent === "favourites") {
            setHeartClass(classes.heart + " hidden");
        }
    };
    const renderOption = () => {
        if (parent === "allRooms") {
            return isFavourite ? heart.filled : heart.contoured;
        } else if (parent === "favourites") {
            return cross;
        }
    };

    return (
        <div
            className={classes.roomWrap}
            onMouseOver={showHeart}
            onMouseLeave={hideHeart}
        >
            <div
                className={heartClass}
                onClick={() => {
                    handleFavouriteChange(_id);
                }}
            >
                {renderOption()}
            </div>
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
                    <NavLink to={"/allRooms/" + _id}>Посмотреть</NavLink>
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
