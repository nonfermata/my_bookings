import React from "react";
import classes from "./form.module.css";
import Button from "../button";
import PropTypes from "prop-types";
import getRandomImage from "../../../utils/getRandomImage";

const SelectAvatar = ({ onChange, name, value }) => {
    const handleChangeAvatar = (event) => {
        event.preventDefault();
        onChange(name, getRandomImage());
    };
    return (
        <div className={classes.selectAvatarWrap}>
            <div className={classes.avatarDecr}>
                <p>Ваша аватарка:</p>
                <div className={classes.avaBtnWtap}>
                    <Button
                        color="sand"
                        onClick={handleChangeAvatar}
                    >
                        Изменить
                    </Button>
                </div>
            </div>
            <img
                className={classes.avatar}
                src={value}
                alt="Image"
            />
        </div>
    );
};

SelectAvatar.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string
};

export default SelectAvatar;
