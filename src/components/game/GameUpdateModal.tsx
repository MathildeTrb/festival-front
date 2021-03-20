import {Game} from "../../utils/types";
import {FC, useContext} from "react";
import {Modal} from "react-bootstrap";
import GameForm from "./GameForm";
import {GameContext} from "./Games";

const GameUpdateModal: FC<{show: boolean, game: Game, onHide: () => void}> = ({show, game, onHide}) => {

    const {games, setGames} = useContext(GameContext);

    const updateGames = newGame => {
        setGames([...games, newGame]);
    }

    return (
        <Modal show={show} size="xl" onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {game.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GameForm game={game} onCreate={updateGames}/>
            </Modal.Body>
        </Modal>
    )
}

export default GameUpdateModal;
