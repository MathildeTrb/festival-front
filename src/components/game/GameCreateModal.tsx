import {FC, useContext} from "react";
import {Modal} from "react-bootstrap";
import {Game} from "../../utils/types";
import GameForm from "./GameForm";
import {GameContext} from "./Games";

const GameCreateModal: FC<{show: boolean, onHide: () => void}> = ({show, onHide}) => {

    const {games, setGames} = useContext(GameContext);

    const handleCreate = (game: Game) => {
        const newGames = [...games, game];
        newGames.sort(((g1, g2) => g1.name.localeCompare(g2.name)))

        setGames(newGames);

        onHide();
    }

    return (
        <Modal show={show} size="xl" onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Création d'un jeu
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GameForm onAction={handleCreate}/>
            </Modal.Body>
        </Modal>
    )
}

export default GameCreateModal;
