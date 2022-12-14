import React, { useEffect, useState } from "react";
import { NUMBER_OF_MONTHS } from "../../../constants";
import { getMonths, getPossibleStartDate } from "../../../utils/renderCalendar";
import classes from "./dateChoice.module.css";
import PropTypes from "prop-types";
import MonthBlock from "./monthBlock";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

const DateChoice = ({
    choiceName,
    choiceValue,
    onSetDate,
    checkInDate,
    checkOutDate,
    onMainClick,
    activeCalendar,
    activateCalendar,
    occupiedDates,
    isStaticCheckIn
}) => {
    let choiceValueString, dateClass;
    if (!choiceValue) {
        dateClass = classes.choiceInitial;
        choiceValueString =
            choiceName === "checkIn"
                ? onSetDate
                    ? "Заезд"
                    : "Доступные даты"
                : "Выезд";
    } else {
        dateClass = classes.choiceDate;
        choiceValueString = moment(choiceValue).format("D MMMM, ddd");
    }
    const months = getMonths();
    const dateNow = new Date();
    const currentDate = Date.parse(
        new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate())
    );
    const currentMonthFirstDay = Date.parse(
        new Date(dateNow.getFullYear(), dateNow.getMonth(), 1)
    );
    const [monthPosition, setMonthPosition] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);

    const getImpossibleDates = () => {
        const arr = [
            {
                from: currentMonthFirstDay,
                to: getPossibleStartDate(choiceName, currentDate, checkInDate)
            }
        ];
        const addedDay = choiceName === "checkOut" ? 86400000 : 0;
        if (isStaticCheckIn && occupiedDates.length !== 0) {
            const nearestBooking = occupiedDates.find(
                (item) => item.checkIn > checkInDate
            );
            const lastDate = Date.parse(
                new Date(
                    dateNow.getFullYear(),
                    dateNow.getMonth() + NUMBER_OF_MONTHS,
                    1
                )
            );
            arr.push({
                from: nearestBooking.checkIn + addedDay,
                to: lastDate
            });
        } else {
            occupiedDates.forEach((item) => {
                arr.push({
                    from: item.checkIn + addedDay,
                    to: item.checkOut + addedDay
                });
            });
        }
        return arr;
    };

    const impossibleDates = getImpossibleDates();

    const handleSetDate = (name, date) => {
        if (choiceName === "checkIn") {
            if (
                date >= checkOutDate ||
                impossibleDates.some(
                    (item) => date < item.from && checkOutDate > item.to
                )
            ) {
                onSetDate(name, date, "checkOut");
            } else onSetDate(name, date);
        } else if (choiceName === "checkOut") {
            if (
                impossibleDates.some(
                    (item) => date >= item.to && checkInDate < item.from
                )
            ) {
                onSetDate(name, date, "checkIn");
            } else onSetDate(name, date);
        }
        setShowCalendar(false);
    };

    const handleMovePosition = (direction) => {
        setMonthPosition((prevState) => prevState + 230 * direction);
    };
    useEffect(() => {
        if (activeCalendar !== choiceName) {
            setShowCalendar(false);
        }
    }, [activeCalendar]);
    useEffect(() => {
        setShowCalendar(false);
    }, [onMainClick]);
    const handleChoice = () => {
        activateCalendar(choiceName);
        setShowCalendar((prevState) => !prevState);
    };
    return (
        <div className={classes.choiceWrap}>
            <div
                className={dateClass}
                onClick={handleChoice}
                id={choiceName}
            >
                {choiceValueString}
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
                            handleSetDate={onSetDate ? handleSetDate : false}
                            choiceName={choiceName}
                            impossibleDates={impossibleDates}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
DateChoice.propTypes = {
    choiceValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    checkInDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    checkOutDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    isStaticCheckIn: PropTypes.bool,
    occupiedDates: PropTypes.array,
    choiceName: PropTypes.string,
    onSetDate: PropTypes.func,
    onMainClick: PropTypes.bool,
    activeCalendar: PropTypes.string,
    activateCalendar: PropTypes.func
};

const mapStateToProps = ({ onMainClick }) => ({
    onMainClick
});

export default connect(mapStateToProps)(DateChoice);
