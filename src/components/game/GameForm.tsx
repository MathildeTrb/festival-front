import {Form, Row, Col} from "react-bootstrap";
import {IGame} from "../../utils/types";
import {FC} from "react";
import GameTypeSelectList from "./GameTypeSelectList";

const GameForm: FC<{game?: IGame}> = ({game}) => {

    return (
        <Form>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Nom
                </Form.Label>
                <Col sm="9">
                    <Form.Control type="text" defaultValue={game ? game.name : ""} />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Nombre de joueurs
                </Form.Label>
                <Col sm="1">
                    <Form.Control type="text" defaultValue={game ? game.minNumberPlayer : ""}/>
                </Col>
                <Col sm="1">
                    <p className="text-center mt-2"> - </p>
                </Col>
                <Col sm="1">
                    <Form.Control type="text" defaultValue={game ? game.maxNumberPlayer : ""}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Âge minimum
                </Form.Label>
                <Col sm="1">
                    <Form.Control type="text" defaultValue={game ? game.minYearPlayer : ""}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                   Durée
                </Form.Label>
                <Col sm="1">
                    <Form.Control type="text" defaultValue={game ? game.duration : ""}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Prototype
                </Form.Label>
                <Col sm="1">
                    <Form.Control type="text" defaultValue={game ? game.minYearPlayer : ""}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Type
                </Form.Label>
                <Col sm="6">
                    <GameTypeSelectList selected={game.type}/>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default GameForm
