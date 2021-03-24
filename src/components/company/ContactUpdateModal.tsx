import {FC, useContext} from "react";
import {Company, Contact} from "../../utils/types";
import {ContactContext} from "./ContactsModal";
import {Modal} from "react-bootstrap";
import ContactForm from "./ContactForm";

const ContactUpdateModal: FC<{ show: boolean, onHide: () => void, contact: Contact, company: Company }> = ({show, onHide, contact, company }) => {

    const {contacts, setContacts} = useContext(ContactContext);

    const handleUpdate = (updatedContact: Contact) => {

        const updatedContacts: Contact[] = [...contacts];

        const index = updatedContacts.findIndex(c => c.id === updatedContact.id);

        updatedContacts[index] = updatedContact;

        setContacts(updatedContacts);

        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Modification du contact {contact.lastname} {contact.firstname}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ContactForm contact={contact} company={company} onAction={handleUpdate} updateMode/>
            </Modal.Body>
        </Modal>
    )
}

export default ContactUpdateModal;
