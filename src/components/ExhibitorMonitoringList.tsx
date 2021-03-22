import {useState} from "react";
import ModalAddFestival from "./festival/ModalAddFestival";

const ExhibitorMonitoringList = () => {

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <div>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>Créer un festival</button>
            <ModalAddFestival show={showModal} onHide={() => setShowModal(false)}/>
        </div>
    )

}

export default ExhibitorMonitoringList
