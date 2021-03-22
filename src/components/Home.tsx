import {useState} from "react";
import axios from "../utils/axios";
import {Button, Form} from "react-bootstrap";
import GameMonitoringStatusSelectList from "./GameMonitoringStatusSelectList";
import {GameMonitoringStatus} from "../utils/types";

const Home = () => {

    const [gameMonitoringStatus, setGameMonitoringStatus] = useState<GameMonitoringStatus>();

    return (
        <>
            <GameMonitoringStatusSelectList handleChange={event => setGameMonitoringStatus(JSON.parse(event.target.value))}/>
        </>
    )
}

export default Home;
