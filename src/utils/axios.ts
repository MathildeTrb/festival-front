import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000/api/"
});

instance.defaults.headers.authorization = localStorage.getItem("token")

export default instance;
