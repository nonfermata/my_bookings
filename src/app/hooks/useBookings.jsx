import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import bookingsService from "../services/bookings.service";

const BookingsContext = React.createContext();

export const useBookings = () => useContext(BookingsContext);

const BookingsProvider = ({ children }) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function createBooking(data) {
        try {
            await bookingsService.create(data);
        } catch (e) {
            errorCatcher(e);
        }
    }

    async function updateBooking(data) {
        try {
            await bookingsService.update(data);
        } catch (e) {
            errorCatcher(e);
        }
    }

    async function getBookings() {
        try {
            return await bookingsService.get();
        } catch (e) {
            errorCatcher(e);
        }
    }

    async function getBookingById(id) {
        try {
            return await bookingsService.getBookingById(id);
        } catch (e) {
            errorCatcher(e);
        }
    }

    function errorCatcher(e) {
        const { message } = e.response.data;
        setError(message);
    }

    return (
        <BookingsContext.Provider
            value={{
                getBookings,
                getBookingById,
                createBooking,
                updateBooking
            }}
        >
            {children}
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
