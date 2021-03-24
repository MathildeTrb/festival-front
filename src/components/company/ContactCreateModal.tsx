import {FC, useContext} from "react";
import {Modal} from "react-bootstrap";
import {Company, Contact} from "../../utils/types";
import ContactForm from "./ContactForm";
import {ContactContext} from "./ContactsModal";

const ContactCreateModal: FC<{show: boolean, onHide: () => void, company: Company}> = ({show, onHide, company}) => {

    const {contacts, setContacts} = useContext(ContactContext);

    const handleCreate = (contact: Contact) => {
        const newContacts: Contact[] = [...contacts, contact];
        newContacts.sort((c1, c2) => c1.lastname.localeCompare(c2.lastname));

        setContacts(newContacts);

        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Création d'un contact de l'entreprise {company.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ContactForm company={company} onAction={handleCreate}/>
            </Modal.Body>
        </Modal>
    )
}

export default ContactCreateModal;
