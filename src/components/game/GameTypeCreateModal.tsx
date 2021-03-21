import {FC, useState} from "react";
import {Col, Form, Modal, Row} from "react-bootstrap";
import axios from "../../utils/axios";
import {GameType} from "../../utils/types";

const GameTypeCreateModal: FC<{show: boolean, onHide: () => void}> = ({show, onHide}) => {

    const [label, setLabel] = useState<string>();

    const handleSubmit = event => {
        event.preventDefault();

        const gameType: GameType = {
            label
        }

        axios.post("gameTypes", {
            gameType
        })
            .then(() => {
                onHide();
            })
    }

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    Création d'un type de jeu
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="formLabel">
                        <Form.Label column sm="3">
                            Libellé
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={label} onChange={event => setLabel(event.target.value)}/>
                        </Col>
                    </Form.Group>

                    <div className="text-center">
                        <button className="mon-button" type="submit">Valider</button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default GameTypeCreateModal;
