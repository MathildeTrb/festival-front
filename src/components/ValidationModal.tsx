import {FC} from "react";
import {Button, Modal} from "react-bootstrap";

type ValidationDeleteModalProps = {
    show: boolean;
    message: string;
    onValidate: any;
    onHide: () => void;
}

const ValidationModal: FC<ValidationDeleteModalProps> = ({show, message, onValidate, onHide}) => {

    const onClick = () => {
        onValidate();
        onHide();
    }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Annuler
                </Button>
                <Button variant="success" onClick={onClick}>
                    Valider
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ValidationModal;
