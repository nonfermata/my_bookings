import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./navbar.module.css";

const Navbar = () => {
    const menu = [
        { id: 716345601, label: "rooms", name: "Наши номера" },
        { id: 716345602, label: "favourites", name: "Избранное" },
        { id: 716345603, label: "admin", name: "Панель администратора" }
    ];
    const menuHTML = menu.map((item) => (
        <li key={item.id} className={classes.item}>
            <NavLink
                to={"/" + item.label}
                className={(isActive) => (isActive ? classes.active : null)}
            >
                {item.name}
            </NavLink>
        </li>
    ));
    return (
        <nav>
            <ul className={classes.menu}>{menuHTML}</ul>
        </nav>
    );
};

export default Navbar;
