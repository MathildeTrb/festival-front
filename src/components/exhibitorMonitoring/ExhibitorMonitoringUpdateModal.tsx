import {FC, useState} from "react";
import {Form, Modal, Row, Col} from "react-bootstrap";
import {ExhibitorMonitoring} from "../../utils/types";
import {useAxiosMethods} from "../../utils/axios-hooks";

const ExhibitorMonitoringUpdateModal: FC<{show: boolean, onHide: () => void, exhibitorMonitoring: ExhibitorMonitoring}> = ({show, onHide, exhibitorMonitoring}) => {

    const [comment, setComment] = useState<string>(exhibitorMonitoring.comment);

    const {put} = useAxiosMethods<ExhibitorMonitoring>("exhibitorMonitorings/comment")

    const handleSubmit = async event => {
        event.preventDefault();

        exhibitorMonitoring.comment = comment;

        put({exhibitorMonitoring})
            .then(() => {
                onHide();
            })
    }

    return (
        <Modal show={show} onHide={onHide} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Modification du suivi de l'exposant {exhibitorMonitoring.exhibitor.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3">
                            Commentaire
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="textarea" value={comment} onChange={event => setComment(event.target.value)}/>
                        </Col>
                    </Form.Group>

                    <div className="text-center">
                        <button type="submit" className="mon-button">Valider</button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ExhibitorMonitoringUpdateModal;
