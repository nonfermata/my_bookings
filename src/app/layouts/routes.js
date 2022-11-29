import Booking from "./booking/booking";
import Rooms from "./rooms";
import RoomPage from "../components/pages/roomPage";
import Admin from "./admin";
import Favourites from "./favourites";
import Login from "./login";

const routes = [
    {
        path: "/booking",
        component: Booking,
        exact: true
    },
    {
        path: "/rooms",
        component: Rooms,
        exact: true
    },
    {
        path: "/rooms/:roomId",
        component: RoomPage,
        exact: false
    },
    {
        path: "/favourites",
        component: Favourites,
        exact: false
    },
    {
        path: "/admin",
        component: Admin,
        exact: false
    },
    {
        path: "/login/:type?",
        component: Login,
        exact: false
    }
];

export default routes;
