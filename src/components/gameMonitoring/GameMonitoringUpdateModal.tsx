import {FC, useContext} from "react";
import {GameMonitoring} from "../../utils/types";
import {GameMonitoringContext} from "./GameMonitorings";
import {Modal} from "react-bootstrap";
import GameMonitoringForm from "./GameMonitoringForm";

const GameMonitoringUpdateModal : FC<{show: boolean, gameMonitoring: GameMonitoring, onHide: ()=> void, fromDashboard?: boolean}> = ({show, gameMonitoring, onHide, fromDashboard = false}) => {

    const {gameMonitorings, setGameMonitorings} = useContext(GameMonitoringContext);

    const handleUpdate = (updatedGameMonitoring: GameMonitoring) => {
        const updatedGameMonitorings = [...gameMonitorings];

        const index = updatedGameMonitorings.findIndex(g => g.game === updatedGameMonitoring.game && g.reservation === updatedGameMonitoring.reservation)
        updatedGameMonitorings[index] = updatedGameMonitoring

        setGameMonitorings(updatedGameMonitorings)

        onHide()
    }

    const handleUpdateFromDashboard = (updatedGameMonitoring: GameMonitoring) => {

        gameMonitoring.quantityExposed = updatedGameMonitoring.quantityExposed;
        gameMonitoring.quantityTombola = updatedGameMonitoring.quantityTombola;
        gameMonitoring.quantityDonation = updatedGameMonitoring.quantityDonation;
        gameMonitoring.status = updatedGameMonitoring.status;
        gameMonitoring.area = updatedGameMonitoring.area;
        gameMonitoring.isPlaced = updatedGameMonitoring.isPlaced
        gameMonitoring.needBeingReturned = updatedGameMonitoring.needBeingReturned;
        gameMonitoring.returnedPrice = updatedGameMonitoring.returnedPrice;

        onHide();
    }

    return(
        <Modal show={show} size="xl" onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {gameMonitoring.game.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GameMonitoringForm gameMonitoring={gameMonitoring} onCreate={fromDashboard ? handleUpdateFromDashboard : handleUpdate} updateMode/>
            </Modal.Body>
        </Modal>
    )
}
export default GameMonitoringUpdateModal;
