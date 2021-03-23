import {FC, useState} from "react";
import {Game} from "../../utils/types";
import EditorModal from "./EditorModal";
import {BsPencilSquare} from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri";
import GameUpdateModal from "./GameUpdateModal";
import {GiRuleBook} from "react-icons/gi";
import ValidationModal from "../ValidationModal";
import axios from "../../utils/axios";
import {Image} from "react-bootstrap";

const GameRow: FC<{ game: Game, onDelete: (game: Game) => void }> = ({game, onDelete}) => {

    const [showModalEditor, setShowModalEditor] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

    const handleDelete = () => {
        axios.delete(`games/${game.id}`)
            .then(() => {
                setShowModalDelete(false);
                onDelete(game);
            })
    }

    return (
        <tr>
            <td><Image fluid width={150} height={150} src={game.imageUrl} alt="Photo"/></td>
            <td>{game.name}</td>
            <td>
                {game.minNumberPlayer === game.maxNumberPlayer ? `${game.minNumberPlayer}` : `${game.minNumberPlayer} - ${game.maxNumberPlayer}`}
            </td>
            <td>{game.minYearPlayer}</td>
            <td>{game.duration} min</td>
            <td>{game.type.label}</td>
            <td>{game.isPrototype ? "Oui" : "Non"}</td>
            <td>
                <p className="p-cursor" onClick={() => setShowModalEditor(true)}>{game.editor.name}</p>
                <EditorModal show={showModalEditor} editor={game.editor} onHide={() => setShowModalEditor(false)}/>
            </td>
            <td>
                {game.manual && <GiRuleBook className="p-cursor" onClick={() => window.open(game.manual)}/>}
            </td>
            <td>
                <BsPencilSquare className="p-cursor" onClick={() => setShowModalUpdate(true)}/>{game.name}
                <GameUpdateModal show={showModalUpdate} game={game} onHide={() => setShowModalUpdate(false)}/>
            </td>
            <td>
                <RiDeleteBin6Line className="p-cursor" onClick={() => setShowModalDelete(true)}/>
                <ValidationModal show={showModalDelete} message="Êtes-vous sûr de vouloir supprimer ce jeu ?" onValidate={handleDelete} onHide={() => setShowModalDelete(false)}/>
            </td>
        </tr>

    )
}

export default GameRow;
