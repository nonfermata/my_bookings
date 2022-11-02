import React, { useState, useEffect } from "react";
import classes from "./login.module.css";
import Button from "../../common/button";
import TextField from "../../common/form/textField";
import validator from "../../../utils/validator";
import validatorFields from "../../../utils/validatorFields";
import RadioField from "../../common/form/radioField";
import CheckBoxField from "../../common/form/checkBoxField";
import SelectField from "../../common/form/selectField";
import dataForDate from "../../../utils/dataForDate";
import validateDate from "../../../utils/validateDate";

const SignUp = () => {
    const initialState = {
        name: "",
        email: "",
        password: "",
        sex: "male",
        licence: false,
        birthday: { day: "", month: "", year: "" }
    };

    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const days = dataForDate.days;
    const months = dataForDate.months;
    const years = dataForDate.years;

    const handleChangeData = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleBirthdayChange = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            birthday: { ...prevState.birthday, [name]: value }
        }));
    };

    const validatorConfig = {
        name: validatorFields.name,
        email: validatorFields.email,
        password: validatorFields.password,
        birthday: validatorFields.birthday,
        licence: validatorFields.licence
    };

    useEffect(() => {
        data.birthday.day = validateDate(data.birthday);
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const onSignUp = (event) => {
        event.preventDefault();
        if (!validate()) return;
        console.log(data);
    };

    return (
        <form onSubmit={onSignUp}>
            <div className={classes.formContainer}>
                <p className={classes.title}>Регистрация</p>
                <TextField
                    name="name"
                    value={data.name}
                    onChange={handleChangeData}
                    error={errors.name}
                    placeholder="Введите свое имя"
                />
                <TextField
                    name="email"
                    value={data.email}
                    onChange={handleChangeData}
                    error={errors.email}
                    placeholder="Введите свой e-mail"
                />
                <TextField
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={handleChangeData}
                    error={errors.password}
                    placeholder="Придумайте пароль"
                />
                <div className={classes.birthdayWrap}>
                    <p className={classes.commonLabel}>
                        Укажите дату Вашего рождения
                    </p>
                    <div className={classes.birthdaySelectGroup}>
                        <SelectField
                            label="День"
                            options={days}
                            defaultOption=""
                            name="day"
                            value={data.birthday.day}
                            onChange={handleBirthdayChange}
                        />
                        <SelectField
                            label="Месяц"
                            options={months}
                            defaultOption=""
                            name="month"
                            value={data.birthday.month}
                            onChange={handleBirthdayChange}
                        />
                        <SelectField
                            label="Год"
                            options={years}
                            defaultOption=""
                            name="year"
                            value={data.birthday.year}
                            onChange={handleBirthdayChange}
                        />
                    </div>
                    {errors.birthday && errors.birthday.trim() && (
                        <p className={classes.error}>{errors.birthday}</p>
                    )}
                </div>
                <RadioField
                    label="Укажите Ваш пол"
                    options={[
                        { name: "Мужской", value: "male" },
                        { name: "Женский", value: "female" }
                    ]}
                    name="sex"
                    value={data.sex}
                    onChange={handleChangeData}
                />
                <CheckBoxField
                    name="licence"
                    value={data.licence}
                    onChange={handleChangeData}
                    error={errors.licence}
                >
                    <span>
                        Подтверждаю согласие с условиями{" "}
                        <a className={classes.licence}>
                            Лицензионного соглашения
                        </a>
                    </span>
                </CheckBoxField>
                <Button
                    color="blue"
                    disabled={!isValid}
                >
                    Зарегистрироваться
                </Button>
            </div>
        </form>
    );
};

export default SignUp;
