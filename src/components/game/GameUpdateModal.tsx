import {IGame} from "../../utils/types";
import {FC} from "react";
import {Modal} from "react-bootstrap";
import GameForm from "./GameForm";

const GameUpdateModal: FC<{show: boolean, game: IGame, onHide: () => void}> = ({show, game, onHide}) => {
    return (
        <Modal
            show={show}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {game.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GameForm game={game}/>
            </Modal.Body>
        </Modal>
    )
}

export default GameUpdateModal;
