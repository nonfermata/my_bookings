const getDateList = (first, last, monthsNames) => {
    const arr = [];
    if (monthsNames) {
        for (let i = first; i <= last; i += 1) {
            arr.push({ name: monthsNames[i - 1], _id: String(i) });
        }
    } else {
        for (let i = first; i <= last; i += 1) {
            arr.push({ name: String(i), _id: String(i) });
        }
    }
    return arr;
};

const days = getDateList(1, 31);
const months = getDateList(1, 12, [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь"
]);
const date = new Date();
const years = getDateList(1901, date.getFullYear());

const dataForDate = {
    days,
    months,
    years
};

export default dataForDate;
