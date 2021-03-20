import {FC, useState} from "react";
import {Game} from "../../utils/types";
import EditorModal from "./EditorModal";
import {BsPencilSquare} from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri";
import GameUpdateModal from "./GameUpdateModal";
import {GiRuleBook} from "react-icons/gi";
import ValidationDeleteModal from "../ValidationDeleteModal";
import axios from "../../utils/axios";
import {Image} from "react-bootstrap";

const GameRow: FC<{ game: Game, onDelete: (game: Game) => void }> = ({game, onDelete}) => {

    const [showModalEditor, setShowModalEditor] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

    const handleShowModal = set => () => {
        set(true);
    }

    const handleCloseModal = set => () => {
        set(false);
    }

    const handleDelete = () => {
        axios.delete(`games/${game.id}`)
            .then(() => {
                setShowModalDelete(false);
                onDelete(game);
            })
    }

    return (
        <tr>
            <td><Image fluid width={150} height={150} src="https://storage.googleapis.com/photo_element_festival/trio.png"/></td>
            <td>{game.name}</td>
            <td>
                {game.minNumberPlayer === game.maxNumberPlayer ? `${game.minNumberPlayer}` : `${game.minNumberPlayer} - ${game.maxNumberPlayer}`}
            </td>
            <td>{game.minYearPlayer}</td>
            <td>{game.duration} min</td>
            <td>{game.type.label}</td>
            <td>{game.isPrototype ? "Oui" : "Non"}</td>
            <td>
                <p className="p-cursor" onClick={handleShowModal(setShowModalEditor)}>{game.editor.name}</p>
                <EditorModal show={showModalEditor} editor={game.editor} onHide={handleCloseModal(setShowModalEditor)}/>
            </td>
            <td>
                {game.manual && <GiRuleBook className="p-cursor" onClick={() => window.open(game.manual)}/>}
            </td>
            <td>
                <BsPencilSquare className="p-cursor" onClick={handleShowModal(setShowModalUpdate)}/>
                <GameUpdateModal show={showModalUpdate} game={game} onHide={handleCloseModal(setShowModalUpdate)}/>
            </td>
            <td>
                <RiDeleteBin6Line className="p-cursor" onClick={handleShowModal(setShowModalDelete)}/>
                <ValidationDeleteModal show={showModalDelete} message="Êtes-vous sûr de vouloir supprimer ce jeu ?"
                                       onDelete={handleDelete} onHide={handleCloseModal(setShowModalDelete)}/>
            </td>
        </tr>

    )
}

export default GameRow;
