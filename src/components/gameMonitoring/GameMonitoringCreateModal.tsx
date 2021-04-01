import {Dispatch, FC, SetStateAction, useContext} from "react";
import {Modal} from "react-bootstrap";
import GameMonitoringForm from "./GameMonitoringForm";
import {GameMonitoring} from "../../utils/types";

const GameMonitoringCreateModal: FC<{show: boolean, onHide: () => void, onCreate?: (gameMonitoring: GameMonitoring) => void}> = ({show, onHide, onCreate }) => {

    const handleCreate = (gameMonitoring: GameMonitoring) => {
        onCreate(gameMonitoring);
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
