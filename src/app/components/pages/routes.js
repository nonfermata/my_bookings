import Rooms from "./rooms";
import RoomPage from "./roomPage";
import Login from "./login";
import Logout from "../ui/logout/logout";
import Contacts from "./contacts";

const routes = [
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
