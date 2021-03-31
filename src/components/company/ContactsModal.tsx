import {createContext, FC, useEffect, useState} from "react";
import {Company, Contact} from "../../utils/types";
import {Modal} from "react-bootstrap";
import ContactRow from "./ContactRow";
import {VscDiffAdded} from "react-icons/vsc";
import ContactCreateModal from "./ContactCreateModal";

type ContactContextProps = {
    contacts: Contact[];
    setContacts: (contacts?: Contact[]) => void;
}

export const ContactContext = createContext<ContactContextProps>({} as ContactContextProps);

const ContactsModal: FC<{company: Company, show: boolean, onHide: () => void}> = ({company, show, onHide}) => {

    const [contacts, setContacts] = useState<Contact[]>(company.contacts);

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);

    const value = {contacts, setContacts}

    useEffect(() => {
        company.contacts = contacts;
    }, [contacts, company])

    return (
        <ContactContext.Provider value={value}>
            <Modal show={show} onHide={onHide} centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Contacts de {company.name}
                    </Modal.Title>
                    <button type="button" className="mon-button" onClick={() => setShowModalCreate(true)}><p><VscDiffAdded/> Ajout d'un contact</p></button>
                    <ContactCreateModal show={showModalCreate} onHide={() => setShowModalCreate(false)} company={company}/>
                </Modal.Header>
                <Modal.Body>
                    {contacts.length === 0 && <>Aucun contact</>}
                    {contacts.length > 0 &&
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
                            {contacts.map((contact, index) => <ContactRow key={index} contact={contact}
                                                                          company={company}/>)}
                            </tbody>
                        </table>
                    }
                </Modal.Body>
            </Modal>

        </ContactContext.Provider>
    )
}

export default ContactsModal;
