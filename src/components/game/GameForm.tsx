import {Form, Row, Col, Button} from "react-bootstrap";
import {Company, Game, GameType} from "../../utils/types";
import {FC, useState} from "react";
import GameTypeSelectList from "./GameTypeSelectList";
import axios from "../../utils/axios";
import CompanySelectList from "../user/CompanySelectList";

const GameForm: FC<{ game?: Game, onCreate: (g: Game) => void, updateMode?: boolean }> = ({game, onCreate, updateMode = false}) => {

    const [name, setName] = useState<string>(game ? game.name : null)
    const [minNumberPlayer, setMinNumberPlayer] = useState<number>(game ? game.minNumberPlayer : null);
    const [maxNumberPlayer, setMaxNumberPlayer] = useState<number>(game ? game.maxNumberPlayer : null);
    const [minYearPlayer, setMinYearPlayer] = useState<number>(game ? game.minYearPlayer : null);
    const [duration, setDuration] = useState<number>(game ? game.duration : null);
    const [type, setType] = useState<GameType>(game ? game.type : null);
    const [isPrototype, setIsPrototype] = useState<boolean>(game && game.isPrototype)
    const [manual, setManual] = useState<string>(game ? game.manual : null);
    //const [image, setImage] = useState(null);
    const [editor, setEditor] = useState<Company>(game ? game.editor : null);

    const handleChange = set => event => {
        set(event.target.value);
    }

    const handleChangeJSON = set => event => {
        set(JSON.parse(event.target.value))
    }

    const inversePrototype = () => {
        setIsPrototype(value => !value);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const newGame: Game = {
            id: game ? game.id : 0,
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

        console.log(updateMode)

        const action = updateMode ? axios.put : axios.post;

        action("games", {
            game: newGame
        })
            .then(() => {
                onCreate(newGame)
            })

        onCreate(newGame);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Nom
                </Form.Label>
                <Col sm="9">
                    <Form.Control type="text" value={name} onChange={handleChange(setName)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Nombre de joueurs
                </Form.Label>
                <Col sm="1">
                    <Form.Control type="text" value={minNumberPlayer} onChange={handleChange(setMinNumberPlayer)}/>
                </Col>
                <Col sm="1">
                    <p className="text-center mt-2"> - </p>
                </Col>
                <Col sm="1">
                    <Form.Control type="text" value={maxNumberPlayer} onChange={handleChange(setMaxNumberPlayer)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Âge minimum
                </Form.Label>
                <Col sm="1">
                    <Form.Control type="text" value={minYearPlayer} onChange={handleChange(setMinYearPlayer)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Durée
                </Form.Label>
                <Col sm="1">
                    <Form.Control type="text" value={duration} onChange={handleChange(setDuration)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Prototype
                </Form.Label>
                <Col sm="1">
                    <Button variant={isPrototype ? "success" : "danger"}
                            onClick={inversePrototype}>{isPrototype ? "Oui" : "Non"}</Button>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Type
                </Form.Label>
                <Col sm="6">
                    <GameTypeSelectList selected={type} handleChange={handleChangeJSON(setType)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Editeur
                </Form.Label>
                <Col sm="6">
                    <CompanySelectList selected={editor} handleChange={handleChangeJSON(setEditor)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Lien manuel
                </Form.Label>
                <Col sm="6">
                    <Form.Control type="text" value={manual} onChange={handleChange(setManual)}/>
                </Col>
            </Form.Group>

            <div className="text-center">
                <button className="mon-button" type="submit">Valider</button>
            </div>
        </Form>
    )
}

export default GameForm
