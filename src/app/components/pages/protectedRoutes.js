import Favourites from "./favourites";
import SetBooking from "./setBooking";
import Admin from "./admin";
import MyBookings from "./myBookings";
import SuccessBooking from "./successBooking";
import EditProfile from "./editProfile";
import EditBooking from "./editBooking";
import Booking from "./booking/booking";

const protectedRoutes = [
    {
        path: "/my-bookings",
        component: MyBookings
    },
    {
        path: "/favourites",
        component: Favourites
    },
    {
        path: "/admin",
        component: Admin
    },
    {
        path: "/edit-profile",
        component: EditProfile
    },
    {
        path: "/edit-booking/:bookingId",
        component: EditBooking
    },
    {
        path: "/booking",
        component: Booking,
        exact: true
    },
    {
        path: "/set-booking/:roomId",
        component: SetBooking
    },
    {
        path: "/success-booking/:bookingId",
        component: SuccessBooking
    }
];

export default protectedRoutes;
