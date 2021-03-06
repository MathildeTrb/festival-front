import {useContext, useState} from "react";
import {FestivalContext} from "../../App";
import {Dropdown} from "react-bootstrap";
import {VscDiffAdded} from "react-icons/vsc";
import ModalHandleFestival from "./ModalHandleFestival";
import {Festival} from "../../utils/types";

const FestivalSelection = ({festivals, setFestivals}) => {

    const [showModal, setShowModal] = useState<boolean>(false)

    const {selectedFestival, setSelectedFestival} = useContext(FestivalContext);

    const handleChange = (eventKey) => {
        setSelectedFestival(JSON.parse(eventKey))
    }

    const handleAdd = (newFestival: Festival) => {
        setFestivals([...festivals, newFestival])
    }

    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
                {selectedFestival.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {festivals.map((festival, index) =>
                    <Dropdown.Item as="button" value={festival.name} key={index} eventKey={JSON.stringify(festival)}
                                   onSelect={handleChange}>
                        {festival.name}
                    </Dropdown.Item>
                )}
                <Dropdown.Divider/>
                <Dropdown.Item as="button" onClick={() => setShowModal(true)}>
                    <p><VscDiffAdded/> Ajouter un festival</p>
                    <ModalHandleFestival title={"ajout d'un festival"} show={showModal} onHide={() => setShowModal(false)} onChange={handleAdd} />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default FestivalSelection;
