import React, { useEffect, useState } from "react";
import classes from "./dateChoice.module.css";
import { getMonthDays, getMonths } from "../../../utils/calendarRender";
import PropTypes from "prop-types";

const DateChoice = ({
    choiceKey,
    choiceName,
    onSetDate,
    checkInDate,
    checkOutDate
}) => {
    const [startPossibleDate, setStartPossibleDate] = useState();
    const months = getMonths();
    const newDate = new Date();
    const currentDate = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate()
    );
    const nextToCurrentDate = new Date(Date.parse(currentDate) + 86400000);

    useEffect(() => {
        if (choiceKey === "checkIn") {
            setStartPossibleDate(new Date(Date.parse(currentDate)));
        } else if (choiceKey === "checkOut") {
            if (checkInDate) {
                setStartPossibleDate(
                    new Date(Date.parse(checkInDate) + 86400000)
                );
            } else {
                setStartPossibleDate(
                    new Date(Date.parse(currentDate) + 86400000)
                );
            }
        }
    }, [checkInDate, checkOutDate]);

    const week = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
    const [monthPosition, setMonthPosition] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);

    document.addEventListener("click", ({ target }) => {
        if (
            !target.className.includes("Arrow") &&
            !target.className.includes("monthName") &&
            !target.className.includes("calendarWrap") &&
            !target.className.includes("calendarWindow") &&
            !target.className.includes("daysGrid") &&
            !target.className.includes("dayNameCell") &&
            !target.className.includes("passiveDayCell") &&
            !target.className.includes("monthWrap") &&
            target.id !== choiceKey
        ) {
            setShowCalendar(false);
        }
    });

    const handleSetDate = (key, date) => {
        if (date) {
            if (choiceKey === "checkIn") {
                if (date >= currentDate) {
                    if (date > checkOutDate) {
                        onSetDate(key, date, "checkOut");
                    } else onSetDate(key, date);
                }
            } else if (choiceKey === "checkOut") {
                if (date >= nextToCurrentDate) {
                    if (checkInDate) {
                        if (date > checkInDate) {
                            onSetDate(key, date);
                        }
                    } else {
                        onSetDate(key, date);
                    }
                }
            }
        }
    };

    const handleMovePosition = (direction) => {
        setMonthPosition((prevState) => prevState + 230 * direction);
    };
    const handleChoice = () => {
        setShowCalendar((prevState) => !prevState);
    };
    return (
        <div className={classes.choiceWrap}>
            <div
                className={
                    /\d/g.test(choiceName)
                        ? classes.choiceDate
                        : classes.choiceInitial
                }
                onClick={handleChoice}
                id={choiceKey}
            >
                {choiceName}
            </div>
            <div
                className={
                    classes.calendarWindow + (showCalendar ? "" : " hidden")
                }
            >
                <div
                    className={classes.calendarWrap}
                    style={{ marginLeft: monthPosition + "px" }}
                >
                    <div
                        className={
                            classes.leftArrow +
                            (monthPosition === 0 ? " hidden" : "")
                        }
                        onClick={() => handleMovePosition(1)}
                    >
                        &#9001;
                    </div>
                    <div
                        className={
                            classes.rightArrow +
                            (monthPosition === -920 ? " hidden" : "")
                        }
                        onClick={() => handleMovePosition(-1)}
                    >
                        &#9002;
                    </div>
                    {months.map((month) => (
                        <div
                            className={classes.monthWrap}
                            key={month.monthName}
                        >
                            <div className={classes.monthName}>
                                {month.monthName}
                            </div>
                            <div className={classes.daysGrid}>
                                {week.map((item, index) => (
                                    <div
                                        key={index}
                                        className={classes.dayNameCell}
                                    >
                                        <>{item}</>
                                    </div>
                                ))}
                                {getMonthDays(month.startDate).map(
                                    (date, index) => (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                handleSetDate(choiceKey, date)
                                            }
                                            className={
                                                (date >= startPossibleDate
                                                    ? classes.dayCell
                                                    : classes.passiveDayCell) +
                                                (date ? "" : " invisible")
                                            }
                                        >
                                            <>{date && date.getDate()}</>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
DateChoice.propTypes = {
    choiceKey: PropTypes.string,
    choiceName: PropTypes.string,
    checkInDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    checkOutDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onSetDate: PropTypes.func
};

export default DateChoice;
