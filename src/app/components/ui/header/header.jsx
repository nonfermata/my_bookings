import React from "react";
import classes from "./header.module.css";
import Navbar from "./navbar/navbar";
import Logo from "./logo/logo";
import LoginLink from "./loginLink/loginLink";

const Header = () => {
    return (
        <header className={classes.headerWrap}>
            <div className={classes.header}>
                <Logo />
                <Navbar />
                <LoginLink />
            </div>
        </header>
    );
};

export default Header;
