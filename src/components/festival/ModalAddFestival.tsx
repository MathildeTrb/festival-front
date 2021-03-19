import {Festival, Space} from "../../utils/types";
import {FC, useState} from "react";
import {Col, Container, Form, Modal, Row} from "react-bootstrap";
import SpacesForm from "../space/SpacesForm";
import axios from "../../utils/axios";
import useToken from "../../utils/useToken";

type ModalAddFestivalProps = {
    show: boolean;
    onHide: () => void;
}

const ModalAddFestival: FC<ModalAddFestivalProps> = ({show, onHide}) => {

    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const url = "https://picsum.photos/500";
    const [isCurrent, setIsCurrent] = useState(false)

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    const {token} = useToken()

    function handleSubmit() {

        setIsSubmitted(true)
        console.log(isSubmitted)

    }

    const createFestival = (spaces : Space[]) => {

        const festival : Festival = {
            name,
            description,
            imageUrl: url,
            isCurrent,
        }

        axios.post("festivals", {
            festival,
            spaces
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })

        console.log(festival)
        console.log(spaces)

        onHide();

    }

    const handleChange = set => event => {
        set(event.target.value)
    }

    function inverseIsCurrent() {
        setIsCurrent(!isCurrent)
    }

    return (
        <div>
            <Modal
                show={show}
                onHide={onHide}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {/*TODO : problème fermeture du modal*/}
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ajout d'un festival
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <Container fluid>
                            <Row>
                                <Col>
                                    <label >Nom du festival : </label>
                                    <input
                                        className="mon-input"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={handleChange(setName)}
                                    />
                                </Col>
                                <Col>
                                    <label className="vertical-align">description : </label>
                                    <textarea
                                    className="mon-input"
                                    required
                                    value={description}
                                    onChange={handleChange(setDescription)}>
                                    </textarea>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>url affiche : </label>
                                    <input
                                        className="mon-input"
                                        type="text"
                                        required
                                        value={url}
                                        // onChange={handleChange(set)}
                                    />
                                </Col>
                                <Col>
                                    <label>festival courant ? </label>
                                    <button className={isCurrent ? "mon-validate-button" : "mon-delete-button"} onClick={inverseIsCurrent}>{isCurrent ? "OUI" : "NON"}</button>
                                </Col>
                            </Row>
                        </Container>
                    </form>
                    <hr/>
                    <SpacesForm isSubmitted={isSubmitted} createFestival={createFestival}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="mon-validate-button" onClick={handleSubmit}>
                        validation
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalAddFestival
