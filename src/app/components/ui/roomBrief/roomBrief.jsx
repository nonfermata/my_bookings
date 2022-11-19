import React, { useState } from "react";
import classes from "./roomBrief.module.css";
import PropTypes from "prop-types";
// import DeleteCrossButton from "../../common/deleteCrossButton";
import Button from "../../common/button";
import { NavLink } from "react-router-dom";

const RoomBrief = ({ id, name, briefDescription, price, mainPhoto, deleteRoom }) => {
    const briefDescriptionHTML = briefDescription.map((item) => (
        <li key={item}>{item}</li>
    ));
    const [optionsClass, setOptionsClass] = useState(classes.options + " " + classes.hidden);
    const showOptions = () => {
        setOptionsClass(classes.options);
    };
    const hideOptions = () => {
        setOptionsClass(classes.options + " " + classes.hidden);
    };

    return (
        <div
            className={classes.roomWrap}
            onMouseOver={showOptions}
            onMouseLeave={hideOptions}
        >
            <div className={classes.imgWrap}>
                <img className={classes.image} src={mainPhoto} alt="Photo"/>
            </div>
            <h1>{name}</h1>
            <ul className={classes.briefDescriptionList}>
                {briefDescriptionHTML}
            </ul>
            <div className={classes.price}>${price}</div>
            <div className={optionsClass}>
                {/* <DeleteCrossButton */}
                {/*    title="Delete" */}
                {/*    deleteItem={() => deleteRoom(id)} */}
                {/* /> */}
            </div>
            <div className={classes.goToNumberBtn}>
                <Button color="blue">
                    <NavLink to={"/rooms/" + id}>Посмотреть</NavLink>
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
    id: PropTypes.string.isRequired,
    deleteRoom: PropTypes.func.isRequired
};

export default RoomBrief;
