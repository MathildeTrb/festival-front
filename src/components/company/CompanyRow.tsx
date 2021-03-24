import {FC, useContext, useState} from "react";
import {Company} from "../../utils/types";
import {BsPencilSquare} from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri";
import {TiContacts} from "react-icons/ti";
import {GrGamepad} from "react-icons/gr";
import OldContactsModal from "./OldContactsModal";
import GamesModal from "./GamesModal";
import axios from "../../utils/axios";
import {CompanyContext} from "./Companies";
import CompanyUpdateModal from "./CompanyUpdateModal";
import ValidationModal from "../ValidationModal";

const CompanyRow: FC<{ company: Company }> = ({company}) => {

    const {companies, setCompanies} = useContext(CompanyContext);

    const [showModalContacts, setShowModalContacts] = useState<boolean>(false);
    const [showModalGames, setShowModalGames] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

    const handleDelete = () => {
        axios.delete(`companies/${company.id}`)
            .then(() => {
                setShowModalDelete(false);
                setCompanies(companies.filter(c => c.id !== company.id));
            })
    }

    return (
        <tr>
            <td>{company.name}</td>
            <td>{company.mail}</td>
            <td>{company.address}</td>
            <td className={company.canBeExhibitor ? "yes-cell" : "no-cell"}>{company.canBeExhibitor ? "Oui" : "Non"}</td>
            <td>
                <TiContacts className="p-cursor" onClick={() => setShowModalContacts(true)}/> ({company.contacts.length})
                <OldContactsModal show={showModalContacts} onHide={() => setShowModalContacts(false)} company={company}/>
            </td>
            <td>
                <GrGamepad onClick={() => setShowModalGames(true)}/> ({company.games.length})
                <GamesModal show={showModalGames} onHide={() => setShowModalGames(false)} games={company.games}
                            companyName={company.name}/>
            </td>
            <td>
                <BsPencilSquare className="p-cursor" onClick={() => setShowModalUpdate(true)}/>
                <CompanyUpdateModal show={showModalUpdate} company={company} onHide={() => setShowModalUpdate(false)}/>
            </td>
            <td>
                <RiDeleteBin6Line className="p-cursor" onClick={() => setShowModalDelete(true)}/>
                <ValidationModal show={showModalDelete}
                                 message={"Êtes-vous sûr de vouloir supprimer cette entreprise ?"}
                                 onValidate={handleDelete} onHide={() => setShowModalDelete(false)}/>
            </td>
        </tr>
    )
}

export default CompanyRow;
