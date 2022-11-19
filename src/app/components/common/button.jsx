import React from "react";
import classes from "./commonStyles.module.css";
import PropTypes from "prop-types";

const Button = ({ children, color, disabled, onClick }) => {
    return (
        <button
            className={
                classes["button-" + color] +
                (disabled ? " " + classes.btnDisabled : "")
            }
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    color: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default Button;
