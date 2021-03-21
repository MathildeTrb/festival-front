import {Dropdown} from "react-bootstrap";
import {VscDiffAdded} from "react-icons/vsc";
import {useContext, useState} from "react";
import ModalAddFestival from "./ModalAddFestival";
import {FestivalContext} from "../../App";

const FestivalSelection = ({festivals}) => {

    const [showModal, setShowModal] = useState<boolean>(false)

    const {selectedFestival, setSelectedFestival} = useContext(FestivalContext);

    const handleChange = (eventKey) => {
        setSelectedFestival(JSON.parse(eventKey))
    }

    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
                {selectedFestival.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {festivals.map((festival, index) =>
                    <Dropdown.Item as="button" value={festival.name} key={index} eventKey={JSON.stringify(festival)} onSelect={handleChange}>
                        {festival.name}
                    </Dropdown.Item>
                )}
                <Dropdown.Divider/>
                <Dropdown.Item as="button" onClick={() => setShowModal(true)}>
                    <p><VscDiffAdded/> Ajouter un festival</p>
                    <ModalAddFestival show={showModal} onHide={() => setShowModal(false)}/>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default FestivalSelection;
