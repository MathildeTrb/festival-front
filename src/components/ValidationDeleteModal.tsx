import {FC} from "react";
import {Button, Modal} from "react-bootstrap";

type ValidationDeleteModalProps = {
    show: boolean,
    message: string,
    onDelete: () => void,
    onHide: () => void
}

const ValidationDeleteModal: FC<ValidationDeleteModalProps> = ({show, message, onDelete, onHide}) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={onHide}>
                Annuler
            </Button>
            <Button variant="success" onClick={onDelete}>
                Valider
            </Button>
        </Modal.Footer>
    </Modal>
)

export default ValidationDeleteModal;
