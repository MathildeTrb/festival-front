import {Festival, Space} from "../../utils/types";
import {FC, useEffect, useState} from "react";
import {Col, Form, Modal, Row, Spinner} from "react-bootstrap";
import axios from "../../utils/axios";
import useToken from "../../utils/useToken";
import SpaceForm from "../space/SpaceForm";
import {useAxiosPhoto} from "../../utils/axios-hooks";

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
    const [image, setImage] = useState<File>(null)
    const [isCurrent, setIsCurrent] = useState<boolean>(festival ? festival.isCurrent : false)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [numberOfSpaces, setNumberOfSpaces] = useState<number>(3)
    const [spaces, setSpaces] = useState<Space[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {token} = useToken()

    const {upload} = useAxiosPhoto();

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

    const handleChangeImage = event => {
        setImage(event.currentTarget.files[0])
    }

    useEffect(() => {
        if (isSubmitted && (spaces.length == numberOfSpaces || updateMode)) {
            updateMode?
                updateFestival()
                :
                createFestival()
        }
    }, [isSubmitted, numberOfSpaces, spaces])

    const updateFestival = async () => {

        const imageUrl: string = image ? await upload(image) : null;

        const constructedFestival: Festival = {
            id: festival.id,
            name,
            description,
            imageUrl,
            isCurrent,
        }

        await axios.put("festivals", {festival: constructedFestival})

        constructedFestival.areas = festival.areas;
        constructedFestival.spaces = festival.spaces;
        constructedFestival.creationDate = festival.creationDate;

        onChange(constructedFestival);
        onHide();
    }

    const createFestival = async () => {


        setIsLoading(true)

        const imageUrl: string = image ? await upload(image) : null;

        const festival: Festival = {
            name,
            description,
            imageUrl,
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

        setIsLoading(false);

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
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Nom
                            </Form.Label>
                            <Col sm="3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={handleChange(setName)}
                                    required
                                />
                            </Col>
                            <Col sm="1"/>
                            <Form.Label column sm="1">
                                Description
                            </Form.Label>
                            <Col sm="5">
                                <textarea className="form-control" rows={2} value={description} onChange={handleChange(setDescription)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Affiche
                            </Form.Label>
                            <Col sm="3">
                                <Form.File onChange={handleChangeImage} label={image ? image.name : "Choisir une image"} data-browse="Parcourir" custom/>
                            </Col>
                            <Col sm="1"/>
                            <Form.Label column sm="2">
                                Festival courant ?
                            </Form.Label>
                            <Col>
                                <button type="button"
                                        className={isCurrent ? "mon-validate-button" : "mon-delete-button"}
                                        onClick={() => setIsCurrent(!isCurrent)}>{isCurrent ? "OUI" : "NON"}</button>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Nombre d'espaces
                            </Form.Label>
                            <Col sm="3">
                                <input type="int" className="form-control" value={numberOfSpaces} onChange={handleChange(setNumberOfSpaces)} required disabled={updateMode}/>
                            </Col>
                        </Form.Group>
                    </Form>
                    <hr/>
                    { !updateMode && <hr/> &&
                    createRow()}
                </Modal.Body>
                <Modal.Footer>
                    <div className="text-center">
                        <button className="mon-validate-button" onClick={() => setIsSubmitted(true)}>
                            Valider
                        </button>
                        {isLoading && <Spinner animation="border" variant="primary"/>}
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalHandleFestival;
