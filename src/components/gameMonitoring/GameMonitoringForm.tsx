import {Area, Game, GameMonitoring, GameMonitoringStatus} from "../../utils/types";
import {FC, useContext, useEffect, useState} from "react";
import {Alert, Button, CardImg, Col, Form, Row, Spinner} from "react-bootstrap";
import GameMonitoringStatusSelectList from "./GameMonitoringStatusSelectList";
import {FaRadiation} from "react-icons/all";
import AreaSelectList from "./AreaSelectList";
import axios from "../../utils/axios";
import {FestivalContext} from "../../App";
import {Hint} from "react-autocomplete-hint";
import {useAxios} from "../../utils/axios-hooks";
import {IHintOption} from "react-autocomplete-hint/dist/src/IHintOption";
import {ExhibitorMonitoringContext} from "../exhibitorMonitoring/dashboard/ExhibitorGameMonitorings";

const GameMonitoringForm: FC<{ gameMonitoring?: GameMonitoring, onCreate: (gm : GameMonitoring) => void, updateMode?: boolean}> = ({gameMonitoring, onCreate, updateMode=false}) => {

    const [status, setStatus] = useState<GameMonitoringStatus>(gameMonitoring ? gameMonitoring.status : null)
    const [area, setArea] = useState<Area>(gameMonitoring ? gameMonitoring.area : null)
    const [quantityExposed, setQuantityExposed] = useState<number>(gameMonitoring ? gameMonitoring.quantityExposed : 0)
    const [quantityTombola, setQuantityTombola] = useState<number>(gameMonitoring ? gameMonitoring.quantityTombola : 0)
    const [quantityDonation, setQuantityDonation] = useState<number>(gameMonitoring ? gameMonitoring.quantityDonation : 0)
    const [needBeingReturned, setNeedBeingReturned] = useState<boolean>(gameMonitoring && gameMonitoring.needBeingReturned)
    const [returnedPrice, setReturnedPrice] = useState<number>(gameMonitoring ? gameMonitoring.returnedPrice : 0)
    const [isPlaced, setIsPlaced] = useState<boolean>(gameMonitoring && gameMonitoring.isPlaced)

    const [nameGame, setNameGame] = useState<string>("");

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showAlertGame, setShowAlertGame] = useState<boolean>(false);

    const {data: games} = useAxios<Game[]>("games");

    const {exhibitorMonitoring} = useContext(ExhibitorMonitoringContext);

    const handleSubmit = async event => {

        event.preventDefault();

        const game: Game = games.find(g => g.name.toLowerCase() === nameGame.toLowerCase());

        if (!game) {
            setShowAlertGame(true)
        }

        if(!status || !area){
            setShowAlert(true)
        }
        else {

            const newGameMonitoring: GameMonitoring = {
                game : updateMode ? gameMonitoring.game : game,
                reservation : updateMode ? gameMonitoring.reservation : exhibitorMonitoring.reservation,
                quantityTombola,
                quantityExposed,
                quantityDonation,
                needBeingReturned,
                isPlaced,
                returnedPrice,
                status,
                area
            }

            const action = updateMode ? axios.put : axios.post;

            action("gameMonitorings", {
                gameMonitoring: newGameMonitoring
            })
                .then(({data}) => {
                    onCreate(updateMode ? newGameMonitoring : data)
                })
        }
    }

    const handleChange = set => event => {
        set(event.currentTarget.value);
    }

    const handleChangeJSON = set => event => {
        set(JSON.parse(event.target.value))
    }

    const inversePlaced = () => {
        setIsPlaced(value => !value)
    }
    const inverse = () => {
        setNeedBeingReturned(value => !value)
    }
    return(
        <Form onSubmit={handleSubmit}>
            <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
                <div className="text-center">
                    Champs manquants
                </div>
            </Alert>

            {!updateMode &&

            <>
                <Alert show={showAlertGame} variant="warning" onClose={() => setShowAlertGame(false)} dismissible>
                    <div className="text-center">
                        Jeu inexistant
                    </div>
                </Alert>


                <Form.Group as={Row}>
                    <Form.Label column sm="3">
                        Jeu
                    </Form.Label>
                    <Col sm="6">
                        {games &&
                        <Hint options={games.map<IHintOption>(game => {
                            return {
                                id: game.id,
                                label: game.name
                            }
                        })}>
                            <input type="text" className="form-control" value={nameGame} onChange={event => setNameGame(event.target.value)}/>
                        </Hint>
                        }
                    </Col>
                </Form.Group>
            </>
            }


            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Statut du jeu
                </Form.Label>
                <Col sm={"6"}>
                    <GameMonitoringStatusSelectList selected={status} handleChange={handleChangeJSON(setStatus)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Sélection de la zone
                </Form.Label>
                <Col sm="6">
                    <AreaSelectList selected={area} handleChange={handleChangeJSON(setArea)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Placé ?
                </Form.Label>
                <Col sm="2">
                    <Button variant={isPlaced ? "success" : "danger"}
                    onClick={inversePlaced}>{isPlaced ? "Oui" : "Non"}</Button>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Quantité donnée
                </Form.Label>
                <Col sm="1">
                    <Form.Control type="int" value={quantityDonation} onChange={handleChange(setQuantityDonation)}>
                    </Form.Control>
                </Col>


            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Quantité Tombola
                </Form.Label>
                <Col sm={"1"}>
                    <Form.Control type="int" value={quantityTombola} onChange={handleChange(setQuantityTombola)}>
                    </Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Quantité exposée
                </Form.Label>
                <Col sm={"1"}>
                    <Form.Control type="int" value={quantityExposed} onChange={handleChange(setQuantityExposed)}>
                    </Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Doit être retourné ?
                </Form.Label>
                <Col sm="1">
                    <Button type="button" variant={needBeingReturned ? "success" : "danger"}
                            onClick={inverse}>{needBeingReturned ? "Oui" : "Non"}</Button>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Montant du retour
                </Form.Label>
                    <Col sm={"1"}>
                    <Form.Control type="int" value={returnedPrice} onChange={handleChange(setReturnedPrice)}>
                    </Form.Control>
                    </Col>
            </Form.Group>

            <div className="text-center">
                <button className="mon-button" type="submit">Valider</button>
            </div>

        </Form>
    )

}
export default GameMonitoringForm;

