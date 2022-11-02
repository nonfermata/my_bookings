const validatorFields = {
    name: {
        isRequired: {
            message: "Имя обязательно для заполнения"
        }
    },
    email: {
        isRequired: {
            message: "E-mail обязателен для заполнения"
        },
        isEmail: {
            message: "Некорректный e-mail"
        }
    },
    password: {
        isRequired: {
            message: "Пароль обязателен для заполнения"
        },
        isCapitalSymbol: {
            message: "Пароль должен содержать хотя бы одну заглавную букву"
        },
        isDigit: {
            message: "Пароль должен содержать хотя бы одну цифру"
        },
        min: {
            value: 8,
            message: `Пароль должен состоять минимум из 8 символов`
        }
    },
    licence: {
        isRequired: {
            message: " "
        }
    },
    birthday: {
        hasDate: {
            message: " "
        },
        isAdult: {
            message:
                "К сожалению, Вы не можете пользоваться нашим сервисом, Вам ещё не исполнилось 18 лет"
        }
    }
};

export default validatorFields;
