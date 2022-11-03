import React, { useEffect, useState } from "react";
import {
    getMonths,
    getPossibleStartDate
} from "../../../utils/renderCalendar/renderCalendar";
import classes from "./dateChoice.module.css";
import PropTypes from "prop-types";
import MonthBlock from "./monthBlock";

const DateChoice = ({
    choiceKey,
    choiceName,
    onSetDate,
    checkInDate,
    checkOutDate
}) => {
    const [possibleStartDate, setPossibleStartDate] = useState();
    const months = getMonths();
    const newDate = new Date();
    const currentDate = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate()
    );
    const nextToCurrentDate = new Date(Date.parse(currentDate) + 86400000);
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

    useEffect(() => {
        setPossibleStartDate(
            getPossibleStartDate(choiceKey, currentDate, checkInDate)
        );
    }, [checkInDate]);

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
                <div className={classes.topArrow}></div>
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
                            (monthPosition === -(months.length - 2) * 230
                                ? " hidden"
                                : "")
                        }
                        onClick={() => handleMovePosition(-1)}
                    >
                        &#9002;
                    </div>
                    {months.map((month) => (
                        <MonthBlock
                            key={month.monthName}
                            monthName={month.monthName}
                            startDate={month.startDate}
                            handleSetDate={handleSetDate}
                            choiceKey={choiceKey}
                            possibleStartDate={possibleStartDate}
                        />
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
