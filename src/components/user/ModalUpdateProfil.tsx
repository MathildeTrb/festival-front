import {Col, Container, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import useToken from "../../utils/useToken";

const ModalUpdateProfil = (props) => {

    const previousUser = props.user;

    const token = useToken();

    const [firstname, setFirstname] = useState(previousUser.firstname);
    const [lastname, setLastname] = useState(previousUser.lastname);
    const [mail, setMail] = useState(previousUser.mail);
    const [password, setPassword] = useState("");

    function handleSubmit() {

        const savedPassword = (password === "" ? password : previousUser.password);

        const user = {
            "id" : previousUser.id,
            "firstname": firstname,
            "lastname": lastname,
            "mail": mail,
            "password": savedPassword
        }
        props.onClick(user)
        props.onHide()
    }

    const handleChange = set => event => {
        set(event.target.value)
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modification du profil
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
