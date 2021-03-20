import {Col, Dropdown} from "react-bootstrap";
import {RiDeleteBin6Line} from "react-icons/ri";
import {VscDiffAdded} from "react-icons/vsc";
import {useState} from "react";
import ModalAddFestival from "./ModalAddFestival";

const FestivalSelection = ({selectedFestival, festivals, handleChange}) => {

    const [showModal, setShowModal] = useState<boolean>(false)

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(value => !value)
        console.log("show modal vaut "+ showModal)
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
                <Dropdown.Item onClick={handleShowModal}>
                    <p><VscDiffAdded/> Ajouter un festival</p>
                    <ModalAddFestival show={showModal} onHide={handleCloseModal}/>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default FestivalSelection;
