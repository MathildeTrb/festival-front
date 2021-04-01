import {FC, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {BsPencilSquare} from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri";
import {GameMonitoring} from "../../../utils/types";
import GameMonitoringUpdateModal from "../../gameMonitoring/GameMonitoringUpdateModal";
import ValidationModal from "../../ValidationModal";

const ExhibitorGameMonitoringRow: FC<{gameMonitoring: GameMonitoring, onDelete: () => void}> = ({gameMonitoring, onDelete}) => {

    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

    return (
        <tr>
            <td>{gameMonitoring.game.name}</td>
            <td className="text-center">
                <Row>
                    <Col>
                        {gameMonitoring.quantityExposed}
                    </Col>
                    <Col>
                        {gameMonitoring.quantityTombola}
                    </Col>
                    <Col>
                        {gameMonitoring.quantityDonation}
                    </Col>
                </Row>
            </td>
            <td>{gameMonitoring.status.label}</td>
            <td>{gameMonitoring.area.label}</td>
            <td className={gameMonitoring.isPlaced ? "yes-cell" : "no-cell"}>{gameMonitoring.isPlaced ? "Oui" : "Non"}</td>
            <td>
                {gameMonitoring.needBeingReturned ? <>Oui
                    ({gameMonitoring.returnedPrice} €)</> : <>Non</>}
            </td>
            <td className="text-center">{new Date(gameMonitoring.dateUpdate).toLocaleDateString()}</td>
            <td className="text-center">
                <Row>
                    <Col>
                        <BsPencilSquare className="p-cursor" onClick={() => setShowModalUpdate(true)}/>
                        <GameMonitoringUpdateModal show={showModalUpdate} gameMonitoring={gameMonitoring} onHide={() => setShowModalUpdate(false)} fromDashboard/>
                    </Col>
                    <Col>
                        <RiDeleteBin6Line className="p-cursor" onClick={() => setShowModalDelete(true)}/>
                        <ValidationModal show={showModalDelete} message={`Êtes-vous sûr de vouloir supprimer le suivi du jeu ${gameMonitoring.game.name} ?`} onValidate={onDelete} onHide={() => setShowModalDelete(false)}/>
                    </Col>
                </Row>
            </td>
        </tr>
    )
}

export default ExhibitorGameMonitoringRow;
