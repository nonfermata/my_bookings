import React, { useEffect, useState } from "react";
import classes from "./popupSubmit.module.css";
import PropTypes from "prop-types";
import Button from "../button";
import SpaceDiv from "../spaceDiv";

const PopupSubmit = ({ children, onSubmit, onExit }) => {
    const [windowClass, setWindowClass] = useState(classes.windowHidden);
    useEffect(() => {
        setWindowClass("");
    }, []);
    return (
        <div className={classes.darkWindow + " " + windowClass}>
            <div className={classes.messageWindow}>
                <div className={classes.message}>{children}</div>
                <div className={classes.buttonsWrap}>
                    <Button
                        color="orange"
                        onClick={onSubmit}
                    >
                        Да, я абсолютно тверд в своих намерениях и в полной мере
                        осознаю всю степень ответственности за последствия
                        принятого решения
                    </Button>
                    <SpaceDiv height="20" />
                    <Button
                        color="grey"
                        onClick={onExit}
                    >
                        Ой нет, я передумал
                    </Button>
                </div>
            </div>
        </div>
    );
};

PopupSubmit.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    onSubmit: PropTypes.func,
    onExit: PropTypes.func
};

export default PopupSubmit;
