import React from "react";
import classes from "./loader.module.css";
import loaderRing from "../../../assets/images/dual_ring_loader.gif";

const Loader = () => {
    return (
        <div className={classes.loader}>
            <p>L O A D I N G . . . . .</p>
            <img
                src={loaderRing}
                alt="loading"
            />
        </div>
    );
};

export default Loader;
