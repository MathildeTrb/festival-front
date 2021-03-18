import {FC, useState} from "react";
import {IGame} from "../types";
import EditorModal from "./EditorModal";
import {Button} from "react-bootstrap";

const GameRow: FC<{ game: IGame }> = ({game}) => {

    const [showModalEditor, setHandleShowModalEditor] = useState<boolean>(false);

    const handleShowModalEditor = () => {
        setHandleShowModalEditor(true);
    }

    const handleCloseModalEditor = () => {
        setHandleShowModalEditor(false);
    }

    const openManual = (url: string) => () => {
        window.open(url);
    }

    return (
        <tr>
            <td><img src="" alt=""/></td>
            <td>{game.name}</td>
            <td>{game.minNumberPlayer}</td>
            <td>
                {game.minNumberPlayer === game.maxNumberPlayer ? `${game.minNumberPlayer}` : `${game.minNumberPlayer} - ${game.maxNumberPlayer}`}
            </td>
            <td>{game.minYearPlayer}</td>
            <td>{game.type.label}</td>
            <td>
                <button className="btn btn-outline-primary" onClick={openManual(game.manual)}>Manuel</button>
            </td>
            <td>{game.isPrototype}</td>
            <td>
                <Button variant="none" onClick={handleShowModalEditor}>{game.editor.name}</Button>
                {showModalEditor && <EditorModal show={showModalEditor} editor={game.editor} onHide={handleCloseModalEditor}/>}
            </td>
        </tr>

    )
}

export default GameRow;
