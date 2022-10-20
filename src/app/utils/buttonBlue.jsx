import React from "react";
import classes from "./utils.module.css";
import PropTypes from "prop-types";

const ButtonBlue = ({ children }) => {
    return (
        <button className={classes.buttonBlue}>
            {children}
        </button>
    );
};

ButtonBlue.propTypes = {
    children: PropTypes.array.isRequired
};

export default ButtonBlue;
