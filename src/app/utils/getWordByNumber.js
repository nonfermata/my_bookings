const getWordByNumber = (value, category) => {
    const categoryArr = getWordsByCategory(category);
    let word = categoryArr[2];
    if (value % 10 === 1 && Math.floor((value / 10) % 10) !== 1) {
        word = categoryArr[0];
    } else if (
        (value % 10 === 2 || value % 10 === 3 || value % 10 === 4) &&
        Math.floor((value / 10) % 10) !== 1
    ) {
        word = categoryArr[1];
    }
    return word;
};

function getWordsByCategory(category) {
    switch (category) {
        case "дни":
            return ["день", "дня", "дней"];
        case "ночи":
            return ["ночь", "ночи", "ночей"];
        case "часы":
            return ["час", "часа", "часов"];
        case "минуты":
            return ["минута", "минуты", "минут"];
        case "люди":
            return ["человек", "человека", "человек"];
        case "гости":
            return ["гость", "гостя", "гостей"];
        default:
            return [];
    }
}

export default getWordByNumber;
