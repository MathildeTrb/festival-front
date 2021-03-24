import {createContext, FC, useState} from "react";
import {Company, Contact} from "../../utils/types";

type ContactContextProps = {
    contacts: Contact[];
    setContacts: (contacts?: Contact[]) => void;
}

export const ContactContext = createContext<ContactContextProps>({} as ContactContextProps);

const ContactsModal: FC<{company: Company}> = ({company}) => {

    const [contacts, setContacts] = useState<Contact[]>();

    return (
        <>
        </>
    )
}

export default ContactsModal;
