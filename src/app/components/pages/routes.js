import Rooms from "./rooms";
import RoomPage from "./roomPage";
import Login from "./login";
import Logout from "../ui/logout/logout";

const routes = [
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
        path: "/logout",
        component: Logout,
        exact: false
    },
    {
        path: "/login/:type?",
        component: Login,
        exact: false
    }
];

export default routes;
