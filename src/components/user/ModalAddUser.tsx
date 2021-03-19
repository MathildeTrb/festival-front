import {Col, Container, Modal, Row} from "react-bootstrap";
import {FC, useState} from "react";
import {User} from "../../utils/types";

type ModalAddUserProps = {
    show: boolean;
    onHide: () => void;
    addAccount: (user: User) => void;
}

const ModalUpdateProfil: FC<ModalAddUserProps> = ({show, onHide, addAccount}) => {


    const [firstname, setFirstname] = useState<string>();
    const [lastname, setLastname] = useState<string>();
    const [mail, setMail] = useState<string>();
    const [password, setPassword] = useState<string>();


    function handleSubmit() {

        const user : User = {
            firstname: firstname,
            lastname: lastname,
            mail: mail,
            password: password,
            isAdmin: false
        }

        addAccount(user);
        onHide();
    }

    const handleChange = set => event => {
        set(event.target.value)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                     Ajout d'un bénévole
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>

                    <Container fluid>
                        <Row>
                            <Col>
                                <label>Mail : </label>
                                <input
                                    className="mon-input"
                                    type="text"
                                    required
                                    value={mail}
                                    onChange={handleChange(setMail)}
                                />
                            </Col>
                            <Col>
                                <label>Prénom : </label>
                                <input
                                    className="mon-input"
                                    type="text"
                                    required
                                    value={firstname}
                                    onChange={handleChange(setFirstname)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>Nom : </label>
                                <input
                                    className="mon-input"
                                    type="text"
                                    required
                                    value={lastname}
                                    onChange={handleChange(setLastname)}
                                />
                            </Col>
                            <Col>
                                <label>Mot de passe : </label>
                                <input
                                    className="mon-input"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={handleChange(setPassword)}
                                />
                            </Col>
                        </Row>
                    </Container>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="mon-validate-button" onClick={handleSubmit}>
                    validation
                </button>
            </Modal.Footer>
        </Modal>
    );

}

export default ModalUpdateProfil;
