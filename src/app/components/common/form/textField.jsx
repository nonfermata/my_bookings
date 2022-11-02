import React, { useState } from "react";
import classes from "./form.module.css";
import PropTypes from "prop-types";
import eye from "../eye";

const TextField = ({ type, onChange, placeholder, name, value, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toogleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    const handleChange = ({ target }) => {
        onChange(name, target.value);
    };
    return (
        <div className={classes.inputWrap}>
            <input
                className={classes.input}
                type={showPassword ? "text" : type}
                onChange={handleChange}
                placeholder={placeholder}
                id={name}
                name={name}
                value={value}
            />
            {type === "password" && (
                <div
                    className={classes.eye}
                    onClick={toogleShowPassword}
                    title={showPassword ? "Скрыть пароль" : "Показать пароль"}
                >
                    {showPassword ? eye.slash : eye.open}
                </div>
            )}
            {error && <p className={classes.error}>{error}</p>}
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string
};

export default TextField;
