const NUMBER_OF_MONTHS = 6;

export const getMonthDays = (startDate) => {
    const month = startDate.getMonth();
    const year = startDate.getFullYear();
    const monthsDays = [];
    const emptyDays = (startDate.getDay() + 6) % 7;
    for (let i = 1; i <= emptyDays; i += 1) {
        monthsDays.push("");
    }
    let daysNumber;
    if (month === 3 || month === 5 || month === 8 || month === 10) {
        daysNumber = 30;
    } else if (month === 1) {
        if (year % 4 === 0) daysNumber = 29;
        else daysNumber = 28;
    } else daysNumber = 31;
    for (let i = 1; i <= daysNumber; i += 1) {
        startDate.setDate(i);
        const ms = Date.parse(startDate);
        monthsDays.push(new Date(ms));
    }
    return monthsDays;
};

export const getMonths = () => {
    const date = new Date();
    const months = [];
    for (
        let i = date.getMonth();
        i <= date.getMonth() + NUMBER_OF_MONTHS - 1;
        i += 1
    ) {
        let year = date.getFullYear();
        const month = i % 12;
        if (i > 11) {
            year += 1;
        }
        months.push({
            startDate: new Date(year, month, 1),
            monthName: getMonthName(month) + " " + year
        });
    }
    return months;
};

function getMonthName(month) {
    const arr = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ];
    return arr[month];
}

export const getPossibleStartDate = (choiceKey, currentDate, checkInDate) => {
    if (choiceKey === "checkIn") {
        return new Date(Date.parse(currentDate));
    } else if (choiceKey === "checkOut") {
        if (checkInDate) {
            return new Date(Date.parse(checkInDate) + 86400000);
        } else {
            return new Date(Date.parse(currentDate) + 86400000);
        }
    }
};
