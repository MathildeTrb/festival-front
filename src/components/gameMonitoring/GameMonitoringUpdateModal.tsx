import {FC, useContext} from "react";
import {GameMonitoring} from "../../utils/types";
import {GameMonitoringContext} from "./GameMonitorings";
import {Modal} from "react-bootstrap";
import GameMonitoringForm from "./GameMonitoringForm";

const GameMonitoringUpdateModal : FC<{show: boolean, gameMonitoring: GameMonitoring, onHide: ()=> void}> = ({show, gameMonitoring, onHide}) => {

    const {gameMonitorings, setGameMonitorings} = useContext(GameMonitoringContext);

    const handleUpdate = (updatedGameMonitoring: GameMonitoring) => {
        console.log("ICIIIIIIIIIIIIIIIIIIIIIIIIIIII")
        console.log(updatedGameMonitoring)
        const updatedGameMonitorings = [...gameMonitorings];

        console.log(updatedGameMonitorings)
        const index = updatedGameMonitorings.findIndex(g => g.game === updatedGameMonitoring.game && g.reservation === updatedGameMonitoring.reservation)
        console.log(index)
        updatedGameMonitorings[index] = updatedGameMonitoring

        setGameMonitorings(updatedGameMonitorings)

        onHide()
    }

    return(
        <Modal show={show} size="xl" onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {gameMonitoring.game.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GameMonitoringForm gameMonitoring={gameMonitoring} onCreate={handleUpdate} updateMode/>
            </Modal.Body>
        </Modal>
    )
}
export default GameMonitoringUpdateModal;
