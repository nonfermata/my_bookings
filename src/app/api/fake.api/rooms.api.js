import defaultPhoto from "../../assets/default-room.png";

const rooms = [
    {
        id: 26817601,
        name: "Двухместный номер «Эконом-1»",
        capacity: 2,
        price: 30,
        mainPhoto: defaultPhoto,
        briefDescription: [
            "Количество гостей: 2",
            "Площадь номера: 15 кв. м",
            "1 двуспальная кровать",
            "Санузел общий, вне номера"
        ],
        amenities: [],
        isBooked: false,
        isFavourite: false
    },
    {
        id: 26817602,
        name: "Двухместный номер «Эконом-2»",
        capacity: 2,
        price: 30,
        mainPhoto: defaultPhoto,
        briefDescription: [
            "Количество гостей: 2",
            "Площадь номера: 15 кв. м",
            "2 односпальные кровати",
            "Санузел общий, вне номера"
        ],
        photos: [],
        amenities: [],
        isBooked: false,
        isFavourite: false
    },
    {
        id: 26817603,
        name: "Двухместный номер «Стандарт-1»",
        capacity: 3,
        price: 50,
        mainPhoto: defaultPhoto,
        briefDescription: [
            "Количество гостей: 2",
            "Площадь номера: 18 кв. м",
            "1 двуспальная кровать",
            "Санузел в номере"
        ],
        photos: [],
        amenities: [],
        isBooked: false,
        isFavourite: false
    },
    {
        id: 26817604,
        name: "Двухместный номер «Стандарт-2»",
        capacity: 2,
        price: 50,
        mainPhoto: defaultPhoto,
        briefDescription: [
            "Количество гостей: 2",
            "Площадь номера: 18 кв. м",
            "2 односпальные кровати",
            "Санузел в номере"
        ],
        photos: [],
        amenities: [],
        isBooked: false,
        isFavourite: false
    },
    {
        id: 26817605,
        name: "Трехместный номер «Эконом»",
        capacity: 3,
        price: 50,
        mainPhoto: defaultPhoto,
        briefDescription: [
            "Количество гостей: 3",
            "Площадь номера: 20 кв. м",
            "1 двуспальная кровать",
            "Санузел общий, вне номера"
        ],
        photos: [],
        amenities: [],
        isBooked: false,
        isFavourite: false
    },
    {
        id: 26817606,
        name: "Трехместный номер «Стандарт»",
        capacity: 3,
        price: 70,
        mainPhoto: defaultPhoto,
        briefDescription: [
            "Количество гостей: 3",
            "Площадь номера: 22 кв. м",
            "1 двуспальная кровать",
            "Санузел в номере"
        ],
        photos: [],
        amenities: [],
        isBooked: false,
        isFavourite: false
    },
    {
        id: 26817607,
        name: "Семейный номер с собственной кухней",
        capacity: 5,
        price: 100,
        mainPhoto: defaultPhoto,
        briefDescription: [
            "Количество гостей: 5",
            "Площадь номера: 35 кв. м",
            "1 двуспальная кровать, 3 односпальные кровати",
            "Санузел в номере",
            "Кухня"
        ],
        photos: [],
        amenities: [],
        isBooked: false,
        isFavourite: false
    },
    {
        id: 26817608,
        name: "Семейный номер с собственной кухней",
        capacity: 5,
        price: 100,
        mainPhoto: defaultPhoto,
        briefDescription: [
            "Количество гостей: 5",
            "Площадь номера: 35 кв. м",
            "1 двуспальная кровать, 1 двуспальный диван-кровать, 1 односпальная кровать",
            "Санузел в номере",
            "Кухня"
        ],
        photos: [],
        amenities: [],
        isBooked: false,
        isFavourite: false
    },
    {
        id: 26817609,
        name: "Апартаменты-студия «Люкс-1»",
        capacity: 4,
        price: 120,
        mainPhoto: defaultPhoto,
        briefDescription: [
            "Количество гостей: 4",
            "Площадь номера: 30 кв. м",
            "1 двуспальная кровать, 1 двуспальный диван-кровать",
            "Санузел в номере",
            "Кухня",
            "Мини-бар"
        ],
        photos: [],
        amenities: [],
        isBooked: false,
        isFavourite: false
    },
    {
        id: 26817610,
        name: "Апартаменты-студия «Люкс-2»",
        capacity: 4,
        price: 120,
        mainPhoto: defaultPhoto,
        briefDescription: [
            "Количество гостей: 4",
            "Площадь номера: 30 кв. м",
            "1 двуспальная кровать, 2 односпальные кровати",
            "Санузел в номере",
            "Кухня",
            "Мини-бар"
        ],
        photos: [],
        amenities: [],
        isBooked: false,
        isFavourite: false
    }
];

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(rooms);
        }, 1000);
    });

const getById = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(rooms.find((user) => user._id === id));
        }, 1000);
    });

export default {
    fetchAll,
    getById
};
