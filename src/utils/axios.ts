import axios from "axios";

const instance = axios.create({
    //baseURL: "https://festival-jeu.herokuapp.com/api/"
    baseURL: "http://localhost:8000/api/"
});

export default instance;
