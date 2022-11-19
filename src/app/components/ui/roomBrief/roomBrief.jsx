import React, { useState } from "react";
import classes from "./roomBrief.module.css";
import PropTypes from "prop-types";
import Button from "../../common/button";
import { NavLink } from "react-router-dom";
import heart from "../../common/heart";

const RoomBrief = ({
    _id,
    name,
    briefDescription,
    price,
    mainPhoto,
    isFavourite,
    handleFavouriteChange
}) => {
    const [heartClass, setHeartClass] = useState(
        isFavourite ? classes.heart : classes.heart + " hidden"
    );
    const showHeart = () => {
        setHeartClass(classes.heart);
    };
    const hideHeart = () => {
        if (!isFavourite) setHeartClass(classes.heart + " hidden");
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
                {isFavourite ? heart.filled : heart.contoured}
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
                    <NavLink to={"/rooms/" + _id}>Посмотреть</NavLink>
                </Button>
            </div>
        </div>
    );
};

RoomBrief.propTypes = {
    name: PropTypes.string.isRequired,
    mainPhoto: PropTypes.string.isRequired,
    briefDescription: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    isFavourite: PropTypes.bool,
    handleFavouriteChange: PropTypes.func
};

export default RoomBrief;
