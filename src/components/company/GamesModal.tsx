import {FC, useState} from "react";
import {Modal} from "react-bootstrap";
import {Game} from "../../utils/types";
import {BsPencilSquare} from "react-icons/bs";
import GameUpdateModal from "../game/GameUpdateModal";

type GamesModalProps = {
    show: boolean;
    onHide: () => void;
    games: Game[];
    companyName: string
}

const GamesModal: FC<GamesModalProps> = ({show, onHide, games, companyName}) => {

    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    return (
        <Modal show={show} size="lg" onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Jeux de {companyName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Photo</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {games.map((game, index) => {
                        return (
                            <tr key={index}>
                                <td>Photo</td>
                                <td>{game.name}</td>
                                <td></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    )
}

export default GamesModal;
