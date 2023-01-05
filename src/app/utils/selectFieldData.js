const getList = (first, last, monthsNames) => {
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

export const days = getList(1, 31);

export const months = getList(1, 12, [
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
export const years = getList(1901, date.getFullYear());

export const personsForBooking = getList(1, 5);
