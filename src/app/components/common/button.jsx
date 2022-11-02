import React from "react";
import classes from "./commonStyles.module.css";
import PropTypes from "prop-types";

const Button = ({ children, color, disabled }) => {
    return (
        <button
            className={classes["button-" + color] + (disabled ? " " + classes.btnDisabled : "")}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    color: PropTypes.string,
    disabled: PropTypes.bool
};

export default Button;
