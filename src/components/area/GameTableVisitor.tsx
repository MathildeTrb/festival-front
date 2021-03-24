import {Game} from "../../utils/types";
import {FC} from "react";
import GameTableRowVisitor from "./GameTableRowVisitor";

const GameTableVisitor: FC<{ games: Game[] }> = ({games}) => (
    <table className="table table-striped table-hover">
        <thead>
        <tr>
            <th scope="col">Photo</th>
            <th scope="col">Nom</th>
            <th scope="col">Nombre de joueurs</th>
            <th scope="col">Âge minimum</th>
            <th scope="col">Durée</th>
            <th scope="col">Type</th>
            <th scope="col">Prototype</th>
            <th scope="col">Editeur</th>
        </tr>
        </thead>
        <tbody>
        {games.sort((g1, g2) => g1.name.localeCompare(g2.name)).map((game, index) => <GameTableRowVisitor key={index} game={game}/>)}
        </tbody>
    </table>
)

export default GameTableVisitor;
