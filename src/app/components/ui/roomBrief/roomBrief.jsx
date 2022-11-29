import React, { useState } from "react";
import classes from "./roomBrief.module.css";
import PropTypes from "prop-types";
import Button from "../../common/button";
import { NavLink } from "react-router-dom";
import heart from "../../common/heart";
import cross from "../../common/loader/cross";
import TopButton from "../../common/topButton";

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
    const [topButtonStyle, setTopButtonStyle] = useState(
        isFavourite && parent === "rooms" ? {} : { display: "none" }
    );
    const showTopButton = () => {
        setTopButtonStyle({});
    };
    const hideTopButton = () => {
        if (!isFavourite || parent === "favourites") {
            setTopButtonStyle({ display: "none" });
        }
    };
    const getTopButtonSVG = () => {
        if (parent === "rooms") {
            return isFavourite ? heart.filled : heart.contoured;
        } else if (parent === "favourites") {
            return cross;
        }
    };
    const getTopButtonTitle = () => {
        if (parent === "favourites") {
            return "Удалить из Избранного";
        } else if (parent === "rooms") {
            return isFavourite
                ? "Удалить из Избранного"
                : "Добавить в Избранное";
        }
    };

    return (
        <div
            className={classes.roomWrap}
            onMouseOver={showTopButton}
            onMouseLeave={hideTopButton}
        >
            <TopButton
                style={topButtonStyle}
                title={getTopButtonTitle()}
                handleClick={() => {
                    handleFavouriteChange(_id);
                }}
            >
                {getTopButtonSVG()}
            </TopButton>
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
            <div className={classes.goToRoomBtn}>
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
