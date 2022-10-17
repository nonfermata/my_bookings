import React from 'react';
import classes from './header.module.css'
import Navbar from "./navbar/navbar";
import Logo from "./logo/logo";
import LoginReg from "./loginReg/loginReg";

const Header = () => {
    return (
        <header className={classes.header}>
            <Logo/>
            <Navbar/>
            <LoginReg/>
        </header>
    )
}

export default Header