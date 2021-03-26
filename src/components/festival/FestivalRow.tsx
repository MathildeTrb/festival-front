import {FC, useState} from "react";
import {Festival} from "../../utils/types";
import {Button, Image} from "react-bootstrap";

const FestivalRow: FC<{festival: Festival}> = ({festival}) => {

    const [showModalSpaces, setShowModalSpaces] = useState<boolean>(false);
    const [showModalAreas, setShowModalAreas] = useState<boolean>(false);

    return (
        <tr className={festival.isCurrent ? "tr-blue": ""}>
            <td><Image fluid width={150} height={150} src={festival.imageUrl} alt="Photo"/></td>
            <td>{festival.name}</td>
            <td>{festival.description}</td>
            <td>{festival.isCurrent ? "Oui" : "Non"}</td>
            <td>{new Date(festival.creationDate).toLocaleDateString()}</td>
            <td className="p-cursor" onClick={() => setShowModalSpaces(true)}>
                {festival.spaces.length} espace{festival.spaces.length > 1 ? "s" : ""}
            </td>
            <td className="p-cursor" onClick={() => setShowModalAreas(true)}>
                {festival.areas.length} zone{festival.areas.length > 1 ? "s" : ""}
            </td>
        </tr>
    )
}

export default FestivalRow;
