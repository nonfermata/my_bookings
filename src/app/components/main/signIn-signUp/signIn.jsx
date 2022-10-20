import React, { useState } from "react";
import classes from "./signInUp.module.css";
import ButtonBlue from "../../../utils/buttonBlue";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const emailValue = React.createRef();
    const onEmailChange = () => {
        setEmail(emailValue.current.value);
    };

    const [password, setPassword] = useState("");
    const passwordValue = React.createRef();
    const onPswChange = () => {
        setPassword(passwordValue.current.value);
    };

    const onSignIn = () => {
        if (email.trim() && password.trim()) {
            // signIn(email, password);
            console.log("Testing Sign In");
        }
    };
    return (
        <div className={classes.formContainer}>
            <p className={classes.title}>Вход</p>
            <input
                className={classes.input}
                type="email"
                onChange={onEmailChange}
                ref={emailValue}
                placeholder="Введите e-mail"
                value={email}
            />
            <input
                className={classes.input + " " + classes.inputLast}
                type="password"
                onChange={onPswChange}
                ref={passwordValue}
                placeholder="Введите пароль"
                value={password}
            />
            <ButtonBlue>
                <div onClick={onSignIn}>Войти</div>
            </ButtonBlue>
        </div>
    );
};

export default SignIn;
