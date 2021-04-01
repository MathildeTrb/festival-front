import {FC, useContext} from "react";
import {Company, ExhibitorMonitoring, GameMonitoring} from "../../utils/types";
import {Modal} from "react-bootstrap";
import ExhibitorForm from "./ExhibitorForm";
import {ExhibitorMonitoringContext} from "../home/ListContactedNoAnswer";

const ExhibitorCreateModal: FC<{show: boolean, onHide: () => void}> = ({show, onHide}) => {


    const handleCreate = (exhibitorMonitoring: ExhibitorMonitoring) => {

    }

    return(
        <>
            <Modal show={show} onHide={onHide} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Ajout d'un exposant
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ExhibitorForm onAction={handleCreate}/>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ExhibitorCreateModal;
