import {Festival, Space} from "../../utils/types";
import {FC, useEffect, useState} from "react";
import {Col, Modal, Row} from "react-bootstrap";
import axios from "../../utils/axios";
import useToken from "../../utils/useToken";
import SpaceForm from "../space/SpaceForm";

const ModalHandleFestival: FC<{ updateMode?: boolean, title: string, festival?: Festival, show: boolean, onHide: () => void, onChange: (festival: Festival) => void }> = ({
                                                                                                                                                                           updateMode =false,
                                                                                                                                                                           festival,
                                                                                                                                                                           show,
                                                                                                                                                                           onHide,
                                                                                                                                                                           onChange,
                                                                                                                                                                           title
                                                                                                                                                                       }) => {
    const [name, setName] = useState<string>(festival ? festival.name : "");
    const [description, setDescription] = useState<string>(festival ? festival.description : "");
    const [url, setUrl] = useState<string>(festival ? festival.imageUrl : "https://picsum.photos/500")
    const [isCurrent, setIsCurrent] = useState<boolean>(festival ? festival.isCurrent : false)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [numberOfSpaces, setNumberOfSpaces] = useState<number>(3)
    const [spaces, setSpaces] = useState<Space[]>([])

    const {token} = useToken()

    const createRow = () => {
        let rows = []
        for (let i = 0; i < numberOfSpaces; i++){
            rows.push(<SpaceForm isSubmitted={isSubmitted} onSubmit={onSubmit}/>)
            rows.push(<hr/>)
        }
        return rows
    }

    const onSubmit = (newSpace : Space) => {
        setSpaces([...spaces, newSpace])
    }


    const handleChange = set => event => {
        set(event.target.value);
    }

    useEffect(() => {
        if (isSubmitted && (spaces.length == numberOfSpaces || updateMode)) {
            updateMode?
                updateFestival()
                :
                createFestival()
                .then(() => console.log("festival créé"));
        }
    }, [isSubmitted, numberOfSpaces, spaces])

    const updateFestival = async () => {
        const constructedFestival: Festival = {
            id: festival.id,
            name,
            description,
            imageUrl: url,
            isCurrent,
        }

        await axios.put("festivals", {festival: constructedFestival})

        console.log("CONSTRUCTED FESTIVAL")
        console.log(constructedFestival)

        constructedFestival.areas = festival.areas;
        constructedFestival.spaces = festival.spaces;
        constructedFestival.creationDate = festival.creationDate;

        onChange(constructedFestival);
        onHide();
    }

    const createFestival = async () => {

        const festival: Festival = {
            name,
            description,
            imageUrl: url,
            isCurrent,
        }

        const {savedFestival, savedSpaces} = (await axios.post<{savedFestival: Festival, savedSpaces: Space[]}>("festivals", {
            festival,
            spaces
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })).data

        savedFestival.areas = []
        savedFestival.spaces = savedSpaces

        onChange(savedFestival)
        onHide();

    }

    return (
        <div onClick={event => event.stopPropagation()}>
            <Modal show={show} onHide={onHide} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Row>
                            <Col>
                                <label>Nom du festival : </label>
                                <input
                                    type="text"
                                    className="mon-input"
                                    value={name}
                                    onChange={handleChange(setName)}
                                    required
                                />
                            </Col>
                            <Col>
                                <label className="vertical-align">Description : </label>
                                <textarea
                                    className="mon-input"
                                    value={description}
                                    onChange={handleChange(setDescription)}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>Url affiche : </label>
                                <input
                                    type="text"
                                    className="mon-input"
                                    value={url}
                                    onChange={handleChange(setUrl)}
                                    required
                                />
                            </Col>
                            <Col>
                                <label>festival courant ? </label>
                                <button type="button"
                                        className={isCurrent ? "mon-validate-button" : "mon-delete-button"}
                                        onClick={() => setIsCurrent(!isCurrent)}>{isCurrent ? "OUI" : "NON"}</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>
                                    nombre d'espace :
                                </label>
                                <input
                                    type="int"
                                    className="mon-input"
                                    value={numberOfSpaces}
                                    onChange={handleChange(setNumberOfSpaces)}
                                    required
                                    disabled={updateMode}
                                />
                            </Col>
                        </Row>
                    </form>
                    { !updateMode && <hr/> &&
                    createRow()}
                </Modal.Body>
                <Modal.Footer>
                    <button className="mon-validate-button" onClick={() => setIsSubmitted(true)}>
                        Valider
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalHandleFestival;
