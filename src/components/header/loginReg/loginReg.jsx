import React from 'react';
import classes from './loginReg.module.css'
import {NavLink} from "react-router-dom";

const LoginReg = () => {
    return (
        <div className={classes.enterRegWrap}>
            <div className={classes.item}>
                <NavLink to={"/login"}
                         className={link => link.isActive ? classes.active : null}>
                    Вход
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to={"/registration"}
                         className={link => link.isActive ? classes.active : null}>
                    Регистрация
                </NavLink>
            </div>
        </div>
    );
};

export default LoginReg;