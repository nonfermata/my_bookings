import React from "react";
import classes from "./commonStyles.module.css";
import PropTypes from "prop-types";

const DeleteCrossButton = ({ deleteItem, title }) => {
    return (
        <div
            className={classes.deleteCrossButton}
            onClick={deleteItem}
            title={title}
        >
        </div>
    );
};

DeleteCrossButton.propTypes = {
    deleteItem: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export default DeleteCrossButton;
