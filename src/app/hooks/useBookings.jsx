import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import bookingsService from "../services/bookings.service";
import Loader from "../components/common/loader/loader";

const BookingsContext = React.createContext();

export const useBookings = () => useContext(BookingsContext);

const BookingsProvider = ({ children }) => {
    const [bookings, setBookings] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getBookings();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function createBooking(data) {
        try {
            await bookingsService.create(data);
            setBookings((prevState) => [...prevState, data]);
        } catch (e) {
            errorCatcher(e);
        }
    }

    async function updateBooking(data) {
        try {
            await bookingsService.update(data);
            getBookings();
        } catch (e) {
            errorCatcher(e);
        }
    }

    async function getBookings() {
        try {
            const data = await bookingsService.get();
            setBookings(data || []);
            setIsLoading(false);
        } catch (e) {
            errorCatcher(e);
        }
    }

    async function getBookingById(id) {
        try {
            return await bookingsService.getBookingById(id);
        } catch (e) {
            errorCatcher(e);
        } finally {
            setIsLoading(false);
        }
    }

    function errorCatcher(e) {
        const { message } = e.response.data;
        setError(message);
    }

    return (
        <BookingsContext.Provider
            value={{ bookings, getBookingById, createBooking, updateBooking }}
        >
            {!isLoading ? children : <Loader />}
        </BookingsContext.Provider>
    );
};
BookingsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default BookingsProvider;
