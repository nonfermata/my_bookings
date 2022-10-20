import React, { useState } from "react";
import classes from "./carouselBox.module.css";
import PropTypes from "prop-types";

const CarouselBox = ({ children }) => {
    const [offset, setOffset] = useState(0);

    const handlePreviousPhoto = () => {
        if (offset === 0) {
            setOffset(offset - (children.length - 1) * 100);
        } else {
            setOffset(offset + 100);
        }
    };

    const handleNextPhoto = () => {
        if (offset === -(children.length - 1) * 100) {
            setOffset(0);
        } else {
            setOffset(offset - 100);
        }
    };

    return (
        <div className={classes.mainContainer}>
            <div className={classes.control + " " + classes.previous} onClick={handlePreviousPhoto}>
                &lt;
            </div>
            <div className={classes.control + " " + classes.next} onClick={handleNextPhoto}>
                &gt;
            </div>
            <div className={classes.window}>
                <div
                    className={classes.allPhotos}
                    style={{
                        transform: `translateX(${offset}%)`
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

CarouselBox.propTypes = {
    children: PropTypes.array.isRequired
};

export default CarouselBox;
