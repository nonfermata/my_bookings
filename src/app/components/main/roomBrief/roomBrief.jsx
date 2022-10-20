import React from "react";
import classes from "./roomBrief.module.css";
import PropTypes from "prop-types";

const RoomBrief = ({ name, briefDescription, price, mainPhoto }) => {
    const briefDescriptionHTML = briefDescription.map((item) => (
        <li key={item}>{item}</li>
    ));
    return (
        <div className={classes.roomWrap} title="Посмотреть и забронировать">
            <div className={classes.imgWrap}>
                <img className={classes.image} src={mainPhoto} alt="Photo" />
            </div>
            <h1>{name}</h1>
            <ul className={classes.briefDescriptionList}>
                {briefDescriptionHTML}
            </ul>
            <div className={classes.price}>${price}</div>
        </div>
    );
};

RoomBrief.propTypes = {
    name: PropTypes.string.isRequired,
    mainPhoto: PropTypes.string.isRequired,
    briefDescription: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired
};

export default RoomBrief;
