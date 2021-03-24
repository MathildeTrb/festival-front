import {FC} from "react";
import {Modal} from "react-bootstrap";
import {Company, Contact} from "../../utils/types";
import ContactForm from "./ContactForm";

const ContactCreateModal: FC<{company: Company}> = ({company}) => {

    const handleCreate = (contact: Contact) => {
        const newContacts: Contact[] = []
    }

    return (
        <Modal>
            <Modal.Header>
                <Modal.Title>
                    Création d'un contact de l'entreprise {company.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ContactForm company={company} onAction={null}/>
            </Modal.Body>
        </Modal>
    )
}

export default ContactCreateModal;
