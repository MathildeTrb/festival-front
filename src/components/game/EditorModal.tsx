import {Company} from "../../utils/types";
import {FC} from "react";
import {Modal} from "react-bootstrap";

const EditorModal: FC<{show: boolean, editor: Company, onHide: () => void}> = ({show, editor, onHide}) => {
    return (
        <Modal show={show} size="lg" onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {editor.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <strong>Mail :</strong> {editor.mail}
                </div>
                <div>
                    <strong>Adresse :</strong> {editor.address}
                </div>
                <div>
                    <strong>Exposant potentiel :</strong> {editor.canBeExhibitor ? "Oui" : "Non"}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default EditorModal;
