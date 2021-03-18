import {Button, Modal} from "react-bootstrap";
import {useState} from "react";

const ModalUpdateProfil = (props) => {

    const previousUser = props.user;

    const [firstname, setFirstname] = useState(previousUser.firstname);
    const [lastname, setLastname] = useState(previousUser.lastname);
    const [mail, setMail] = useState(previousUser.mail);

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
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );

}

export default ModalUpdateProfil;
