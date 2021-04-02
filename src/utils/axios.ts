import axios from "axios";

const instance = axios.create({
    baseURL: "https://festival-jeu.herokuapp.com/api/"
});

export default instance;
