import Rooms from "./rooms";
import RoomPage from "./roomPage";
import Login from "./login";
import Logout from "../ui/logout/logout";
import Contacts from "./contacts";
import Home from "./home/home";

const routes = [
    {
        path: "/home",
        component: Home
    },
    {
        path: "/rooms",
        component: Rooms,
        exact: true
    },
    {
        path: "/rooms/:roomId",
        component: RoomPage
    },
    {
        path: "/contacts",
        component: Contacts
    },
    {
        path: "/logout",
        component: Logout
    },
    {
        path: "/login/:type?",
        component: Login
    }
];

export default routes;
