import {FC} from "react";
import GameRow from "./GameRow";
import {IGame} from "../../utils/types";
import {GiClick} from "react-icons/all";

const GameTable: FC<{games: IGame[]}> = ({games}) => {
    return (
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
                <th scope="col">Editeur <GiClick/></th>
                <th scope="col"/>
                <th scope="col"/>
                <th scope="col"/>
            </tr>
            </thead>
            <tbody>
            {games.map((game, index) => <GameRow key={index} game={game}/>)}
            </tbody>
        </table>
    )
}

export default GameTable;