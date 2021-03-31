import {FC} from "react";
import {Modal} from "react-bootstrap";
import {ExhibitorMonitoring} from "../../utils/types";

const ExhibitorMonitoringUpdateModal: FC<{show: boolean, onHide: () => void, exhibitorMonitoring: ExhibitorMonitoring}> = ({show, onHide, exhibitorMonitoring}) => {
    return (
        <Modal show={show} onHide={onHide} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Modification 
                </Modal.Title>
            </Modal.Header>
        </Modal>
    )
}

export default ExhibitorMonitoringUpdateModal;
