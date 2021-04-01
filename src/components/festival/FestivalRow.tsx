import {FC, useContext, useState} from "react";
import {Festival} from "../../utils/types";
import {Button, Image} from "react-bootstrap";
import SpacesModal from "./SpacesModal";
import AreasModal from "./AreasModal";
import {BsPencilSquare} from "react-icons/bs"
import ModalHandleFestival from "./ModalHandleFestival";
import {FestivalContext} from "./Festivals";

const FestivalRow: FC<{festival: Festival}> = ({festival}) => {

    const [showModalSpaces, setShowModalSpaces] = useState<boolean>(false);
    const [showModalAreas, setShowModalAreas] = useState<boolean>(false);
    const [showModalUpdateFestival, setShowModalUpdateFestival] = useState<boolean>(false);

    const {festivals, setFestivals} = useContext(FestivalContext)

    const onChange = (updatedFestival : Festival) => {
        const updatedFestivals: Festival[] = [...festivals]
        const index = updatedFestivals.findIndex(f => f.id === updatedFestival.id)
        updatedFestivals[index] = updatedFestival
        setFestivals(updatedFestivals)
    }

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
                <SpacesModal show={showModalSpaces} onHide={() => setShowModalSpaces(false)} festival={festival} />
            </td>
            <td>
                <div className="p-cursor" onClick={() => setShowModalAreas(true)}>
                    {festival.areas.length} zone{festival.areas.length > 1 ? "s" : ""}
                </div>
                <AreasModal show={showModalAreas} onHide={() => setShowModalAreas(false)} festival={festival}/>
            </td>
            <td>
                <BsPencilSquare onClick={() => setShowModalUpdateFestival(true)}/>
                <ModalHandleFestival updateMode title={"Modification du festival"} show={showModalUpdateFestival} onHide={() => setShowModalUpdateFestival(false)} onChange={onChange} festival={festival}/>
            </td>
        </tr>
    )
}

export default FestivalRow;
