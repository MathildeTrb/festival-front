import {FC, useState} from "react";
import {Col, Modal, Row} from "react-bootstrap";
import {Company, Contact} from "../../utils/types";
import {BsPencilSquare} from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri";
import {VscDiffAdded} from "react-icons/vsc";
import ValidationModal from "../ValidationModal";
import ContactCreateUpdateModal from "./ContactCreateUpdateModal";
import axios from "../../utils/axios";

type ContactsModalProps = {
    show: boolean;
    onHide: () => void;
    company: Company;
}

const ContactsModal: FC<ContactsModalProps> = ({show, onHide, company}) => {

    const [contacts, setContacts] = useState<Contact[]>(company.contacts.sort((c1, c2) => c1.lastname.localeCompare(c2.lastname)));

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

    const onCreate = (contact: Contact) => {

        axios.post("contacts", {
            contact
        })
            .then(({data: newContact}) => {
                const updatedContacts = [...contacts, newContact];
                updatedContacts.sort((c1, c2) => c1.lastname.localeCompare(c2.lastname))

                setContacts(updatedContacts)
            })
    }

    const onUpdate = (contact: Contact) => {

        axios.put("contacts", {
            contact
        })
            .then(({data: updatedContact}) => {
                const updatedContacts = [...contacts];
                const index = updatedContacts.findIndex(c => c.id === updatedContact.id);

                updatedContacts[index] = updatedContact;

                setContacts(updatedContacts);
            })

    }

    const onDelete = (contact: Contact) => {

        axios.delete(`contacts/${contact.id}`)
            .then(() => {
                setContacts(contacts.filter(c => c.id !== contact.id))

                setShowModalDelete(false);
            })
    }

    return (
        <Modal show={show} size="xl" onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Contacts de {company.name}
                </Modal.Title>
                <button type="button" className="mon-button" onClick={() => setShowModalCreate(true)}><p><VscDiffAdded/> Ajout d'un contact</p></button>
                <ContactCreateUpdateModal
                    show={showModalCreate}
                    onHide={() => setShowModalCreate(false)}
                    onAction={onCreate}
                    company={company}
                />
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
                                <td>{contact.isImportant ? <strong>Oui</strong> : <>Non</>}</td>
                                <td>
                                    <BsPencilSquare onClick={() => setShowModalUpdate(true)}/>
                                    <ContactCreateUpdateModal
                                        show={showModalUpdate}
                                        onHide={() => setShowModalUpdate(false)}
                                        onAction={onUpdate}
                                        company={company}
                                        contact={contact}
                                        updateMode
                                    />
                                </td>
                                <td>
                                    <RiDeleteBin6Line onClick={() => setShowModalDelete(true)}/>
                                    {/*<ValidationModal
                                        show={showModalDelete}
                                        message="Êtes-vous sûr de vouloir supprimer ce contact ?"
                                        onValidate={onDelete(contact)}
                                        onHide={() => setShowModalDelete(false)}
                                    />*/}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    )

}

export default ContactsModal;
