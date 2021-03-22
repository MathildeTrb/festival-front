import {FC} from "react";
import {Col, Modal, Row} from "react-bootstrap";
import {Contact} from "../../utils/types";
import {BsPencilSquare} from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri";

type ContactsModalProps = {
    show: boolean;
    onHide: () => void;
    contacts: Contact[];
    companyName: string;
}

const ContactsModal: FC<ContactsModalProps> = ({show, onHide, contacts, companyName}) => (
    <Modal show={show} size="xl" onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>
                Contacts de {companyName}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Mail</th>
                    <th scope="col">Téléphone</th>
                    <th scope="col">Job</th>
                    <th scope="col">Important</th>
                    <th scope="col"/>
                    <th scope="col"/>
                </tr>
                </thead>
                <tbody>
                {contacts.map((contact, index) => {

                    return (
                        <tr key={index}>
                            <td>{contact.lastname}</td>
                            <td>{contact.firstname}</td>
                            <td>{contact.mail}</td>
                            <td>
                                {!contact.mobilePhoneNumber && !contact.fixPhoneNumber && <div>Aucun</div>}
                                {contact.mobilePhoneNumber &&
                                <Row>
                                    <Col sm="4">
                                        <strong>Mobile</strong>
                                    </Col>
                                    <Col sm="2">
                                        {contact.mobilePhoneNumber}
                                    </Col>
                                </Row>
                                }
                                {contact.fixPhoneNumber &&
                                <Row>
                                    <Col sm="4">
                                        <strong>Fix</strong>
                                    </Col>
                                    <Col sm="2">
                                        {contact.fixPhoneNumber}
                                    </Col>
                                </Row>
                                }
                            </td>
                            <td>{contact.job}</td>
                            <td>{contact.isImportant ? <strong>Oui</strong> : <p>Non</p>}</td>
                            <td><BsPencilSquare/></td>
                            <td><RiDeleteBin6Line/></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </Modal.Body>
    </Modal>
)

export default ContactsModal;
