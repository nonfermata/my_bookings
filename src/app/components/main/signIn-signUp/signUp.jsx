import React, { useState } from "react";
import classes from "./signInUp.module.css";
import ButtonBlue from "../../../utils/buttonBlue";

const SignUp = () => {
    const [login, setLogin] = useState("");
    const loginValue = React.createRef();
    const onLoginChange = () => {
        setLogin(loginValue.current.value);
    };

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

    const onSignUp = () => {
        if (login.trim() && email.trim() && password.trim()) {
            // const loginId = Date.now() + 26985
            // signUp(login, loginId, email, password);
            console.log("Testing Sign Up");
        }
    };
    return (
        <div className={classes.formContainer}>
            <p className={classes.title}>Регистрация</p>
            <input
                className={classes.input}
                type="text"
                onChange={onLoginChange}
                ref={loginValue}
                placeholder="Введите свое имя"
                value={login}
            />
            <input
                className={classes.input}
                type="email"
                onChange={onEmailChange}
                ref={emailValue}
                placeholder="Введите свой e-mail"
                value={email}
            />
            <input
                className={classes.input + " " + classes.inputLast}
                type="text"
                onChange={onPswChange}
                ref={passwordValue}
                placeholder="Придумайте пароль"
                value={password}
            />
            <ButtonBlue>
                <div onClick={onSignUp}>Зарегистрироваться</div>
            </ButtonBlue>
        </div>
    );
};

export default SignUp;
