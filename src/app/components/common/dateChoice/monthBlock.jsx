import React from "react";
import { getMonthDays } from "../../../utils/renderCalendar";
import classes from "./dateChoice.module.css";
import PropTypes from "prop-types";

const MonthBlock = ({
    monthName,
    startDate,
    handleSetDate,
    choiceName,
    possibleStartDate
}) => {
    const week = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
    function getDayNumber(date) {
        const newDate = new Date(date);
        return newDate.getDate();
    }
    return (
        <div className={classes.monthWrap}>
            <div className={classes.monthName}>{monthName}</div>
            <div className={classes.daysGrid}>
                {week.map((item, index) => (
                    <div
                        key={index}
                        className={classes.dayNameCell}
                    >
                        <>{item}</>
                    </div>
                ))}
                {getMonthDays(startDate).map((date, index) => (
                    <div
                        key={index}
                        onClick={() => handleSetDate(choiceName, date)}
                        className={
                            (date >= possibleStartDate
                                ? classes.dayCell
                                : classes.passiveDayCell) +
                            (date ? "" : " invisible")
                        }
                    >
                        <>{date && getDayNumber(date)}</>
                    </div>
                ))}
            </div>
        </div>
    );
};
MonthBlock.propTypes = {
    monthName: PropTypes.string,
    startDate: PropTypes.number,
    handleSetDate: PropTypes.func,
    choiceName: PropTypes.string,
    possibleStartDate: PropTypes.number
};

export default MonthBlock;