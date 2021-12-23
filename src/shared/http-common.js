
import axios from "axios";

export default axios.create({
    baseURL: "https://unuberaccount.herokuapp.com/api/",
    headers: {
    "Content-type": "application/json"
    }
});