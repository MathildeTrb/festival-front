import {ICompany} from "../types";
import {FC} from "react";
import {Modal} from "react-bootstrap";

const EditorModal: FC<{show: boolean, editor: ICompany, onHide: () => void}> = ({show, editor, onHide}) => {
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={onHide}
            centered
        >
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
                    <strong>Peut-être exposant ?</strong> {editor.canBeExhibitor ? "Oui" : "Non"}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default EditorModal;
