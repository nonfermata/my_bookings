import allData from "./mockData.json";
import httpService from "../services/http.service";

async function initialize() {
    try {
        await allData.rooms.forEach((item) => {
            httpService.put("rooms/" + item._id, item);
        });
    } catch (e) {
        console.log(e);
    }
}

export default initialize;
