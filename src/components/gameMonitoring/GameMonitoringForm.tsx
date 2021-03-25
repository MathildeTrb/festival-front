import {Area, GameMonitoring, GameMonitoringStatus} from "../../utils/types";
import {FC, useContext, useState} from "react";
import {Alert, Button, CardImg, Col, Form, Row, Spinner} from "react-bootstrap";
import GameMonitoringStatusSelectList from "./GameMonitoringStatusSelectList";
import {FaRadiation} from "react-icons/all";
import AreaSelectList from "./AreaSelectList";
import axios from "../../utils/axios";
import {FestivalContext} from "../../App";

const GameMonitoringForm: FC<{ gameMonitoring?: GameMonitoring, onCreate: (gM : GameMonitoring) => void, updateMode?: boolean}> = ({gameMonitoring, onCreate, updateMode=false}) => {

    const [status, setStatus] = useState<GameMonitoringStatus>(gameMonitoring ? gameMonitoring.status : null)
    const [area, setArea] = useState<Area>(gameMonitoring ? gameMonitoring.area : null)
    const [quantityExposed, setQuantityExposed] = useState<number>(gameMonitoring ? gameMonitoring.quantityExposed : null)
    const [quantityTombola, setQuantityTombola] = useState<number>(gameMonitoring ? gameMonitoring.quantityTombola : null)
    const [quantityDonation, setQuantityDonation] = useState<number>(gameMonitoring ? gameMonitoring.quantityDonation : null)
    const [needBeingReturned, setNeedBeingReturned] = useState<boolean>(gameMonitoring ? gameMonitoring.needBeingReturned: null)
    const [returnedPrice, setReturnedPrice] = useState<number>(gameMonitoring ? gameMonitoring.returnedPrice:null)
    const [isPlaced, setIsPlaced] = useState<boolean>(gameMonitoring ? gameMonitoring.isPlaced:null)

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {selectedFestival, setSelectedFestival} = useContext(FestivalContext);

    const handleSubmit = async event => {
        event.preventDefault()
        if(!status || !area ){
            setShowAlert(true)
        }
        else{
            setIsLoading(true);

            const newGameMonitoring: GameMonitoring = {
                game : gameMonitoring.game,
                reservation : gameMonitoring.reservation,
                quantityTombola,
                quantityExposed,
                quantityDonation,
                needBeingReturned,
                isPlaced,
                returnedPrice,
                status,
                area
            }

            console.log(newGameMonitoring.quantityDonation)
            const action = updateMode ? axios.put : axios.post;

            action("gameMonitorings", {
                gameMonitoring: newGameMonitoring
            })
                .then(({data}) => {
                    setIsLoading(false);
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
                    <AreaSelectList selected={area} handleChange={handleChangeJSON(setArea)}></AreaSelectList>
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
                    <Form.Control type="text" value={quantityDonation} onChange={handleChange(setQuantityDonation)}>
                    </Form.Control>
                </Col>


            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Quantité Tombola
                </Form.Label>
                <Col sm={"1"}>
                    <Form.Control type="text" value={quantityTombola} onChange={handleChange(setQuantityTombola)}>
                    </Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Quantité exposée
                </Form.Label>
                <Col sm={"1"}>
                    <Form.Control type="text" value={quantityExposed} onChange={handleChange(setQuantityExposed)}>
                    </Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Doit être retourné ?
                </Form.Label>
                <Col sm="1">
                    <Button variant={needBeingReturned ? "success" : "danger"}
                            onClick={inverse}>{needBeingReturned ? "Oui" : "Non"}</Button>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Montant du retour
                </Form.Label>
                    <Col sm={"1"}>
                    <Form.Control type="text" value={returnedPrice} onChange={handleChange(setReturnedPrice)}>
                    </Form.Control>
                    </Col>
            </Form.Group>

            <div className="text-center">
                <button className="mon-button" type="submit">Valider</button>
                {isLoading && <Spinner animation="border" variant="primary"/>}
            </div>

        </Form>
    )

}
export default GameMonitoringForm;

