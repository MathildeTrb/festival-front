import {createContext, FC, useEffect, useState} from "react";
import GameRow from "./GameRow";
import {GiClick} from "react-icons/all";
import useAxios from "../../utils/useAxios";
import {Game} from "../../utils/types";
import {Form, Spinner, InputGroup, Row, Col} from "react-bootstrap";
import GameCreateModal from "./GameCreateModal";
import {VscDiffAdded} from "react-icons/vsc";
import {BsSearch} from "react-icons/bs"
import GameTypeCreateModal from "./GameTypeCreateModal";

type GameContextProps = {
    games: Game[];
    setGames: (games?: Game[]) => void;
}

export const GameContext = createContext<GameContextProps>({} as GameContextProps);

const Games: FC = () => {

    const {data: games, isPending, setData: setGames} = useAxios<Game[]>("games");

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalGameTypeCreate, setShowModalGameTypeCreate] = useState<boolean>(false);

    const [filterInput, setFilterInput] = useState<string>("");

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

                <Row>
                    <Col md="4">
                        <button type="button" className="mon-button mb-2" onClick={() => setShowModalCreate(true)}><p><VscDiffAdded/> Ajout d'un jeu</p></button>
                        <GameCreateModal show={showModalCreate} onHide={() => setShowModalCreate(false)}/>

                        <button type="button" className="mon-validate-button mb-2" onClick={() => setShowModalGameTypeCreate(true)}><p><VscDiffAdded/> Ajout d'un type de jeu</p></button>
                        <GameTypeCreateModal show={showModalGameTypeCreate} onHide={() => setShowModalGameTypeCreate(false)}/>
                    </Col>
                    <Col md="4"/>
                    <Col md="4">
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text><BsSearch/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" value={filterInput} onChange={event => setFilterInput(event.target.value)}/>
                        </InputGroup>
                    </Col>
                </Row>

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
                    {
                        games
                            .filter(game => game.name.toLowerCase().includes(filterInput.toLowerCase()))
                            .map((game, index) => <GameRow key={index} game={game}/>)
                    }
                    </tbody>
                </table>
            </GameContext.Provider>

            }
        </div>
    )
}

export default Games;
