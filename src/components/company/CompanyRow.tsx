import {FC} from "react";
import {Company} from "../../utils/types";
import {BsPencilSquare} from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri";
import {TiContacts} from "react-icons/ti";
import {GrGamepad} from "react-icons/gr";

const CompanyRow: FC<{company: Company, onDelete: (company: Company) => void}> = ({company, onDelete}) => {

    return (
        <tr>
            <td>{company.name}</td>
            <td>{company.mail}</td>
            <td>{company.address}</td>
            <td>{company.canBeExhibitor ? "Oui" : "Non"}</td>
            <td><TiContacts/></td>
            <td><GrGamepad/></td>
            <td><BsPencilSquare onClick={() => console.log(company)}/></td>
            <td><RiDeleteBin6Line/></td>
        </tr>
    )
}

export default CompanyRow;
