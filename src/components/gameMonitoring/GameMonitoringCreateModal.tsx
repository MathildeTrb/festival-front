import {FC, useContext} from "react";
import {Modal} from "react-bootstrap";
import GameMonitoringForm from "./GameMonitoringForm";
import {GameMonitoring} from "../../utils/types";
import {GameMonitoringContext} from "./GameMonitorings";

const GameMonitoringCreateModal: FC<{show: boolean, onHide: () => void}> = ({show, onHide}) => {

    const {gameMonitorings, setGameMonitorings} = useContext(GameMonitoringContext);

    const handleCreate = (gameMonitoring: GameMonitoring) => {

        const newGameMonitorings: GameMonitoring[] = [...gameMonitorings, gameMonitoring];
        newGameMonitorings.sort((gm1, gm2) => gm1.reservation.exhibitorMonitoring.exhibitor.name.localeCompare(gm2.reservation.exhibitorMonitoring.exhibitor.name))

        setGameMonitorings(newGameMonitorings);

        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                     Création d'un suivi de jeu
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GameMonitoringForm onCreate={handleCreate}/>
            </Modal.Body>
        </Modal>
    )

}

export default GameMonitoringCreateModal;
