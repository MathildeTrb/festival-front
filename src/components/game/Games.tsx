import {createContext, FC, useEffect, useState} from "react";
import GameRow from "./GameRow";
import {GiClick} from "react-icons/all";
import useAxios from "../../utils/useAxios";
import {Game} from "../../utils/types";
import {Spinner} from "react-bootstrap";
import GameCreateModal from "./GameCreateModal";
import {VscDiffAdded} from "react-icons/vsc";

type GameContextProps = {
    games: Game[];
    setGames: (games?: Game[]) => void;
}

export const GameContext = createContext<GameContextProps>({} as GameContextProps);

const Games: FC = () => {

    const {data: games, isPending, setData: setGames} = useAxios<Game[]>("games");

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);

    const onDeleteGame = game => {
        setGames(games.filter(g => g.id !== game.id))
    }

    useEffect(() => {
        document.title = "Liste des jeux"
    })

    const value = {games, setGames};

    return (
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {games &&
                <GameContext.Provider value={value}>

                    <h1 className="text-center mb-5">
                        Liste des jeux
                    </h1>

                    <div>
                        <button type="button" className="mon-button mb-2" onClick={() => setShowModalCreate(true)}><p><VscDiffAdded/> Ajout d'un jeu</p></button>
                        <GameCreateModal show={showModalCreate} onHide={() => setShowModalCreate(false)}/>
                    </div>

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
                        {games.map((game, index) => <GameRow key={index} game={game} onDelete={onDeleteGame}/>)}
                        </tbody>
                    </table>
                </GameContext.Provider>

            }
        </div>
    )
}

export default Games;
