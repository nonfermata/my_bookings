const getMonthName = (month) => {
    switch (month) {
        case 0:
            return "Январь";
        case 1:
            return "Февраль";
        case 2:
            return "Март";
        case 3:
            return "Апрель";
        case 4:
            return "Май";
        case 5:
            return "Июнь";
        case 6:
            return "Июль";
        case 7:
            return "Август";
        case 8:
            return "Сентябрь";
        case 9:
            return "Октябрь";
        case 10:
            return "Ноябрь";
        case 11:
            return "Декабрь";
    }
};

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
    for (let i = date.getMonth(); i <= date.getMonth() + 5; i += 1) {
        let realYear = date.getFullYear();
        let realMonth = i;
        if (i > 11) {
            realMonth = i % 12;
            realYear += 1;
        }
        months.push({
            startDate: new Date(realYear, realMonth, 1),
            monthName: getMonthName(realMonth) + " " + realYear
        });
    }
    return months;
};
