import {Form, Row, Col, Button} from "react-bootstrap";
import {Company, Game, GameType} from "../../utils/types";
import {FC, useState} from "react";
import GameTypeSelectList from "./GameTypeSelectList";
import axios from "../../utils/axios";

const GameForm: FC<{game?: Game, onCreate: (g: Game) => void}> = ({game, onCreate}) => {

    const [name, setName] = useState<string>()
    const [minNumberPlayer, setMinNumberPlayer] = useState<number>();
    const [maxNumberPlayer, setMaxNumberPlayer] = useState<number>();
    const [minYearPlayer, setMinYearPlayer] = useState<number>();
    const [duration, setDuration] = useState<number>();
    const [type, setType] = useState<GameType>();
    const [isPrototype, setIsPrototype] = useState<boolean>(game && game.isPrototype)
    const [manual, setManual] = useState<string>();
    const [image, setImage] = useState(null);
    const [editor, setEditor] = useState<Company>();

    const handleChange = set => event => {
        set(event.target.value);
    }

    const handleChangeJSON = set => event => {
        set(JSON.parse(event.target.value))
    }

    const inversePrototype = () => {
        setIsPrototype(value => !value);
    }

    const handleSubmit = action => event => {
        event.preventDefault();

        console.log(isPrototype)

       /* const newGame: Game = {
            name,
            minNumberPlayer,
            maxNumberPlayer,
            minYearPlayer,
            duration,
            type,
            isPrototype,
            manual,
            editor
        }

        /!*action("games", {
            game: newGame
        })
            .then(() => {
                onCreate(newGame)
            })*!/

        onCreate(newGame);*/
    }

    return (
        <Form onSubmit={handleSubmit(axios.put)}>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Nom
                </Form.Label>
                <Col sm="9">
                    <Form.Control type="text" value={name} onChange={handleChange(setName)} defaultValue={game ? game.name : ""} />
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
                    <Button variant={isPrototype ? "success" : "danger"} onClick={inversePrototype}>{isPrototype ? "OUI" : "NON"}</Button>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Type
                </Form.Label>
                <Col sm="6">
                    <GameTypeSelectList selected={game ? game.type.id : undefined}/>
                </Col>
            </Form.Group>

            <div className="text-center">
                <button disabled className="mon-button" type="submit">Valider</button>
            </div>
        </Form>
    )
}

export default GameForm
