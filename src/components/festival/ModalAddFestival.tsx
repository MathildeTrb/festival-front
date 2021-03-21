import {Festival, Space} from "../../utils/types";
import {FC, useState} from "react";
import {Col, Container, Form, Modal, Row} from "react-bootstrap";
import SpacesForm from "../space/SpacesForm";
import axios from "../../utils/axios";
import useToken from "../../utils/useToken";

const ModalAddFestival: FC<{show: boolean, onHide: () => void}> = ({show, onHide}) => {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>();
    const [url, setUrl] = useState<string>("https://picsum.photos/500")
    const [isCurrent, setIsCurrent] = useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    const {token} = useToken()

    const handleChange = set => event => {
        set(event.target.value);
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

    return (
        <div onClick={event => event.stopPropagation()}>
            <Modal show={show} onHide={onHide} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Ajout d'un festival
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
                                <button className={isCurrent ? "mon-validate-button" : "mon-delete-button"} onClick={() => setIsCurrent(!isCurrent)}>{isCurrent ? "OUI" : "NON"}</button>
                            </Col>
                        </Row>
                    </form>
                    <hr/>
                    <SpacesForm isSubmitted={isSubmitted} createFestival={createFestival}/>
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

export default ModalAddFestival;
