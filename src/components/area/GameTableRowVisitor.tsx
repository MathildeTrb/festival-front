import {FC} from "react";
import {Game} from "../../utils/types";
import {Image} from "react-bootstrap";

const GameTableRowVisitor: FC<{ game: Game }> = ({game}) => (
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
        <td>{game.editor.name}</td>
    </tr>
)

export default GameTableRowVisitor;
