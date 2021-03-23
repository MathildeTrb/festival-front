import {GameMonitoring} from "../../utils/types";
import {FC} from "react";

const GameMonitoringRow: FC<{gameMonitoring: GameMonitoring}> =  ({gameMonitoring}) => {

    return(
        <tr>
            <td>{gameMonitoring.game.name}</td>
            <td>{gameMonitoring.status.label}</td>
            <td>{gameMonitoring.isPlaced? "Oui" : "Non"}</td>
            <td>{gameMonitoring.area.label}</td>
            <td>{gameMonitoring.quantityExposed}</td>
            <td>{gameMonitoring.quantityTombola}</td>
            <td>{gameMonitoring.quantityDonation}</td>
            <td>{gameMonitoring.needBeingReturned ? "Oui" : "Non"}</td>
            <td>{gameMonitoring.returnedPrice}</td>
        </tr>
    )
}
export default GameMonitoringRow;
