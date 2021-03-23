import {useState} from "react";
import {ExhibitorMonitoringStatus} from "../../utils/types";
import ExhibitorMonitoringStatusSelectList from "../exhibitorMonitoring/ExhibitorMonitoringStatusSelectList";

const Home = () => {

    const [exhibitorMonitoringStatus, setExhibitorMonitoringStatus] = useState<ExhibitorMonitoringStatus>();

    return (
        <>
            <ExhibitorMonitoringStatusSelectList handleChange={event => setExhibitorMonitoringStatus(JSON.parse(event.target.value))}/>

            {exhibitorMonitoringStatus && <p>Status : {exhibitorMonitoringStatus.label}</p>}
        </>
    )
}

export default Home;
