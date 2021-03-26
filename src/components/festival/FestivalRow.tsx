import {FC, useState} from "react";
import {Festival} from "../../utils/types";
import {Button, Image} from "react-bootstrap";
import SpacesModal from "./SpacesModal";
import AreasModal from "./AreasModal";

const FestivalRow: FC<{festival: Festival}> = ({festival}) => {

    const [showModalSpaces, setShowModalSpaces] = useState<boolean>(false);
    const [showModalAreas, setShowModalAreas] = useState<boolean>(false);

    console.log(festival.name, festival.isCurrent)

    return (
        <tr className={festival.isCurrent ? "tr-blue": ""}>
            <td><Image fluid width={150} height={150} src={festival.imageUrl} alt="Photo"/></td>
            <td>{festival.name}</td>
            <td>{festival.description ? festival.description : <>Aucune description</>}</td>
            <td>{festival.isCurrent ? "Oui" : "Non"}</td>
            <td>{new Date(festival.creationDate).toLocaleDateString()}</td>
            <td>
                <div className="p-cursor" onClick={() => setShowModalSpaces(true)}>
                    {festival.spaces.length} espace{festival.spaces.length > 1 ? "s" : ""}
                </div>
                <SpacesModal show={showModalSpaces} onHide={() => setShowModalSpaces(false)} festival={festival}/>
            </td>
            <td>
                <div className="p-cursor" onClick={() => setShowModalAreas(true)}>
                    {festival.areas.length} zone{festival.areas.length > 1 ? "s" : ""}
                </div>
                <AreasModal show={showModalAreas} onHide={() => setShowModalAreas(false)} festival={festival}/>
            </td>
        </tr>
    )
}

export default FestivalRow;
