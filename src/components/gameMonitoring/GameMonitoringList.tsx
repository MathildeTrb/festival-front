import {useContext} from "react";
import {FestivalContext} from "../../App";

const GameMonitoringList = () => {

    const {selectedFestival} = useContext(FestivalContext);

    return (
        <div>
            {selectedFestival.name}
        </div>
    )
}

export default GameMonitoringList
