import {GameMonitoring} from "../../utils/types";
import {FC, useState} from "react";
import {BsPencilSquare} from "react-icons/bs";
import GameMonitoringUpdateModal from "./GameMonitoringUpdateModal";

const GameMonitoringRow: FC<{gameMonitoring: GameMonitoring}> =  ({gameMonitoring}) => {

    const [showModalEditor, setShowModalEditor] = useState<boolean>(false)
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)

    const handleShowModal = set => () => {
        set(true)
    }

    const handleCloseModal = set => () => {
        set(false);
    }

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
            <td><BsPencilSquare className="p-cursor" onClick={handleShowModal(setShowModalUpdate)}/>
                { <GameMonitoringUpdateModal show={showModalUpdate} gameMonitoring={gameMonitoring} onHide={handleCloseModal(setShowModalUpdate)}/> }
            </td>
        </tr>
    )
}
export default GameMonitoringRow;
