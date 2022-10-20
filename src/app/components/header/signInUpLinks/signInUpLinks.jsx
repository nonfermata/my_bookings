import React from "react";
import classes from "./signInUpLinks.module.css";
import { NavLink } from "react-router-dom";
import ButtonBlue from "../../../utils/buttonBlue";

const SignInUpLinks = () => {
    return (
        <div className={classes.enterRegWrap}>
            <ButtonBlue>
                <NavLink to={"/sign-in"}>Вход</NavLink>
            </ButtonBlue>
            <ButtonBlue>
                <NavLink to={"/sign-up"}>Регистрация</NavLink>
            </ButtonBlue>
        </div>
    );
};

export default SignInUpLinks;
