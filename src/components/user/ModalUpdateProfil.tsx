import {Col, Container, Modal, Row} from "react-bootstrap";
import {useState} from "react";

const ModalUpdateProfil = (props) => {

    const previousUser = props.user;

    const [firstname, setFirstname] = useState(previousUser.firstname);
    const [lastname, setLastname] = useState(previousUser.lastname);
    const [mail, setMail] = useState(previousUser.mail);
    const [oldPassword, setOldPassword] = useState<string>();
    const [newPassword, setNewPassword] = useState<string>()

    function handleSubmit() {

        const user = {
            "id" : previousUser.id,
            "firstname": firstname,
            "lastname": lastname,
            "mail": mail
        }

        props.updateAccount(user)

        if (oldPassword && newPassword){

            const passwordManaged = {
                "id": previousUser.id,
                "oldPassword": oldPassword,
                "newPassword": newPassword
            }

            props.updatePassword(passwordManaged)
        }

        props.onHide()
    }

    const handleChange = set => event => {
        set(event.target.value)
    }

    return (
        <Modal
            {...props}
            size="xl"
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
                        </Row>
                        <Row>
                            <Col>
                                <label>Ancien mot de passe : </label>
                                <input
                                    className="mon-input"
                                    type="password"
                                    required
                                    value={oldPassword}
                                    onChange={handleChange(setOldPassword)}
                                />
                            </Col>
                            <Col>
                                <label>Nouveau mot de passe : </label>
                                <input
                                    className="mon-input"
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={handleChange(setNewPassword)}
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
