import {FC, useState} from "react";
import {Company} from "../../utils/types";
import {BsPencilSquare} from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri";
import {TiContacts} from "react-icons/ti";
import {GrGamepad} from "react-icons/gr";
import ContactsModal from "./ContactsModal";
import GamesModal from "./GamesModal";

const CompanyRow: FC<{company: Company, onDelete: (company: Company) => void}> = ({company, onDelete}) => {

    const [showContactsModal, setShowContactsModal] = useState<boolean>(false);
    const [showGamesModal, setShowGamesModal] = useState<boolean>(false);

    return (
        <tr>
            <td>{company.name}</td>
            <td>{company.mail}</td>
            <td>{company.address}</td>
            <td className={company.canBeExhibitor ? "yes-cell" : "no-cell"}>{company.canBeExhibitor ? "Oui" : "Non"}</td>
            <td>
                <TiContacts className="p-cursor" onClick={() => setShowContactsModal(true)}/>
                <ContactsModal show={showContactsModal} onHide={() => setShowContactsModal(false)} contacts={company.contacts} companyName={company.name}/>
            </td>
            <td>
                <GrGamepad onClick={() => setShowGamesModal(true)}/>
                <GamesModal show={showGamesModal} onHide={() => setShowGamesModal(false)} games={company.games} companyName={company.name}/>
            </td>
            <td><BsPencilSquare onClick={() => console.log(company)}/></td>
            <td><RiDeleteBin6Line/></td>
        </tr>
    )
}

export default CompanyRow;
