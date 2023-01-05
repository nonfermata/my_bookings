import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import classes from "./profileBlock.module.css";
import ProfileMenu from "./profileMenu/profileMenu";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ProfileBlock = ({ onMainClick }) => {
    const { currentUser } = useAuth();
    const [blockStyle, setBlockStyle] = useState({
        backgroundColor: "var(--profile-bg-color)"
    });
    const [isMenu, setIsMenu] = useState(false);
    const handleMenuStatus = () => {
        setIsMenu((prevState) => !prevState);
        setBlockStyle(
            !isMenu ? { backgroundColor: "var(--profile-bg-color)" } : {}
        );
    };
    useEffect(() => {
        setIsMenu(false);
        setBlockStyle({});
    }, [onMainClick]);
    return (
        <div className={classes.profileBlockWrap}>
            <div
                className={classes.profileBlock}
                style={blockStyle}
                onClick={handleMenuStatus}
            >
                <img
                    className={classes.icon}
                    src={currentUser.image}
                    alt="icon"
                />
                <div className={classes.name}>{currentUser.name}</div>
            </div>
            {isMenu && <ProfileMenu />}
        </div>
    );
};
ProfileBlock.propTypes = {
    onMainClick: PropTypes.bool
};

const mapStateToProps = ({ onMainClick }) => ({
    onMainClick
});

export default connect(mapStateToProps)(ProfileBlock);
