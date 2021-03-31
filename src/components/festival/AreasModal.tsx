import {FC, useState} from "react";
import {Area, Festival, Game, GameMonitoring} from "../../utils/types";
import {ListGroup, Modal, Row, Col, Form, Button, Accordion, Card, ListGroupItem} from "react-bootstrap";
import {useAxiosMethods} from "../../utils/axios-hooks";
import AreaCard from "../area/AreaCard";
import GameTableVisitor from "../area/GameTableVisitor";
import {BsPencilSquare} from "react-icons/bs";

const AreasModal: FC<{ show: boolean, onHide: () => void, festival: Festival }> = ({show, onHide, festival}) => {

    const [label, setLabel] = useState<string>("");

    const {post} = useAxiosMethods<Area>("areas");

    const handleSubmit = async event => {
        event.preventDefault();

        const area: Area = {
            label,
            festival
        }

        const newArea: Area = await post({area});

        festival.areas.push(newArea)

        setLabel("");
    }

    return (
        <Modal show={show} onHide={onHide} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Zones de {festival.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {festival.areas.length === 0 && <div>Aucune zone</div>}
                    {festival.areas.length > 0 &&
                    <ListGroup>
                        {festival.areas.map((area, index) => {
                            return (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col>
                                            {area.label}
                                        </Col>
                                        <Col>
                                            <BsPencilSquare/>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                    }

                    <Form onSubmit={handleSubmit} className="mt-5">
                        <Form.Group as={Row}>
                            <Col sm="5">
                                <Form.Control type="text" value={label} onChange={event => setLabel(event.target.value)}
                                              placeholder="Entrez un libellé de zone"/>
                            </Col>
                            <Col>
                                <Button type="submit" variant="primary">Ajouter</Button>
                            </Col>
                        </Form.Group>
                    </Form>

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AreasModal;
