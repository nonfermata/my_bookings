import React from "react";
import classes from "./roomBrief.module.css";
import photo from "../../../assets/default-room.png";
import PropTypes from "prop-types";

const RoomBrief = ({ name, briefDescription, price }) => {
    const briefDescriptionHTML = briefDescription.map((item) => (
        <li key={item}>{item}</li>
    ));
    return (
        <div className={classes.roomWrap} title="Посмотреть и забронировать">
            <img className={classes.image} src={photo} alt="Photo" />
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
    briefDescription: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired
};

export default RoomBrief;
