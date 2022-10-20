import React from "react";
import classes from "./header.module.css";
import Navbar from "./navbar/navbar";
import Logo from "./logo/logo";
import SignInUpLinks from "./signInUpLinks/signInUpLinks";

const Header = () => {
    return (
        <header className={classes.header}>
            <Logo />
            <Navbar />
            <SignInUpLinks />
        </header>
    );
};

export default Header;
