import {Form, Row, Col, Button, Alert, Spinner} from "react-bootstrap";
import {Company, Game, GameType} from "../../utils/types";
import {FC, useState} from "react";
import GameTypeSelectList from "./GameTypeSelectList";
import axios from "../../utils/axios";
import CompanySelectList from "./CompanySelectList";

const GameForm: FC<{ game?: Game, onAction: (g: Game) => void, updateMode?: boolean }> = ({game, onAction, updateMode = false}) => {

    const [name, setName] = useState<string>(game ? game.name : null)
    const [minNumberPlayer, setMinNumberPlayer] = useState<number>(game ? game.minNumberPlayer : null);
    const [maxNumberPlayer, setMaxNumberPlayer] = useState<number>(game ? game.maxNumberPlayer : null);
    const [minYearPlayer, setMinYearPlayer] = useState<number>(game ? game.minYearPlayer : null);
    const [duration, setDuration] = useState<number>(game ? game.duration : null);
    const [type, setType] = useState<GameType>(game ? game.type : null);
    const [isPrototype, setIsPrototype] = useState<boolean>(game && game.isPrototype)
    const [manual, setManual] = useState<string>(game ? game.manual : null);
    const [image, setImage] = useState<File>(null);
    const [editor, setEditor] = useState<Company>(game ? game.editor : null);

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = set => event => {
        set(event.currentTarget.value);
    }

    const handleChangeJSON = set => event => {
        set(JSON.parse(event.target.value))
    }

    const handleChangeImage = event => {
        setImage(event.currentTarget.files[0])
    }

    const handleSubmitImage = async (): Promise<string> => {

        const formData: FormData = new FormData();
        formData.append("file", image, image.name);

        return (await axios.post<string>("photos", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })).data

    }

    const handleSubmit = async event => {
        event.preventDefault();

        if (!type || !editor) {
            setShowAlert(true);
        }
        else {

            setIsLoading(true);

            const imageUrl: string = image ? await handleSubmitImage() : null;

            const newGame: Game = {
                id: game ? game.id : undefined,
                name,
                minNumberPlayer,
                maxNumberPlayer,
                minYearPlayer,
                duration,
                type,
                isPrototype,
                manual,
                editor,
                imageUrl
            }

            const action = updateMode ? axios.put : axios.post;

            action("games", {
                game: newGame
            })
                .then(({data}) => {
                    setIsLoading(false);
                    onAction(updateMode ? newGame : data)
                })
        }
    }

    return (
        <Form onSubmit={handleSubmit}>

            <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
                <div className="text-center">
                    Champs manquants
                </div>
            </Alert>

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
                            onClick={() => setIsPrototype(!isPrototype)}>{isPrototype ? "Oui" : "Non"}</Button>
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

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Image
                </Form.Label>
                <Col sm="6">
                    <Form.File onChange={handleChangeImage} label={image ? image.name : "Choisir une image"} data-browse="Parcourir" custom/>
                </Col>
            </Form.Group>

            <div className="text-center">
                <button className="mon-button" type="submit">Valider</button>
                {isLoading && <Spinner animation="border" variant="primary"/>}
            </div>
        </Form>
    )
}

export default GameForm
