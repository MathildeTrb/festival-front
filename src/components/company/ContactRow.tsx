import {FC, useContext, useState} from "react";
import {Company, Contact} from "../../utils/types";
import {ContactContext} from "./ContactsModal";
import axios from "../../utils/axios";
import {Col, Row} from "react-bootstrap";
import {BsPencilSquare} from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri";
import ValidationModal from "../ValidationModal";
import ContactUpdateModal from "./ContactUpdateModal";

const ContactRow: FC<{contact: Contact, company: Company}> = ({contact, company}) => {

    const {contacts, setContacts} = useContext(ContactContext);

    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

    const handleDelete = () => {
        axios.delete(`contacts/${contact.id}`)
            .then(() => {
                setShowModalDelete(false);
                setContacts(contacts.filter(c => c.id !== contact.id))
            })
    }

    return (
        <tr>
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
                <BsPencilSquare className="p-cursor" onClick={() => setShowModalUpdate(true)}/>
                <ContactUpdateModal show={showModalUpdate} onHide={() => setShowModalUpdate(false)} contact={contact} company={company}/>
            </td>
            <td>
                <RiDeleteBin6Line className="p-cursor" onClick={() => setShowModalDelete(true)}/>
                <ValidationModal show={showModalDelete} message="Êtes-vous sûr de vouloir de supprimer ce contact ?" onValidate={handleDelete} onHide={() => setShowModalDelete(false)}/>
            </td>

        </tr>
    )
}

export default ContactRow;
