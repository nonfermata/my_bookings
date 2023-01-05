import React from "react";
import classes from "./editProfile.module.css";
import { useAuth } from "../../../hooks/useAuth";

const EditProfile = () => {
    const { currentUser: user } = useAuth();
    return (
        <>
            <div className="mainTitle">Редактировать профиль</div>
            <div className={classes.editWrap}>Edit {user.name}</div>
        </>
    );
};

export default EditProfile;
