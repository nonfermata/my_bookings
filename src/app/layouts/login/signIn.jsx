import React, { useEffect, useState } from "react";
import classes from "./login.module.css";
import Button from "../../components/common/button";
import TextField from "../../components/common/form/textField";
import validator from "../../utils/validator";
import validatorFields from "../../utils/validatorFields";

const SignIn = () => {
    const initialState = {
        email: "",
        password: ""
    };
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChangeData = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const validatorConfig = {
        email: validatorFields.email,
        password: validatorFields.password
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const onSignIn = (event) => {
        event.preventDefault();
        if (!validate()) return;
        console.log(data);
    };

    return (
        <form onSubmit={onSignIn}>
            <div className={classes.formContainer}>
                <p className={classes.title}>Вход</p>
                <TextField
                    name="email"
                    value={data.email}
                    onChange={handleChangeData}
                    placeholder="Введите e-mail"
                    error={errors.email}
                />
                <TextField
                    type="password"
                    name="password"
                    value={data.password}
                    error={errors.password}
                    onChange={handleChangeData}
                    placeholder="Введите пароль"
                />
                <Button
                    color="blue"
                    disabled={!isValid}
                >
                    Войти
                </Button>
            </div>
        </form>
    );
};

export default SignIn;
