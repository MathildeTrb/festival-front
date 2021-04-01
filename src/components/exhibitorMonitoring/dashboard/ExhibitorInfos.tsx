import {FC, useState} from "react";
import {Accordion, Card, Container, Row, Col, Button, Modal} from "react-bootstrap";
import {Company, Contact} from "../../../utils/types";
import {FiPhoneCall} from "react-icons/all";

const ExhibitorInfosContactRow: FC<{contact: Contact}> = ({contact}) => {

    const [showModalPhone, setShowModalPhone] = useState<boolean>(false)

    return (
        <Row>
            <Col>{contact.lastname}</Col>
            <Col>{contact.firstname}</Col>
            <Col>{contact.mail}</Col>
            <Col className={"text-right"}>
                <FiPhoneCall className="p-cursor" onClick={() => setShowModalPhone(true)}/>
                <Modal show={showModalPhone} onHide={() => setShowModalPhone(false)} centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Téléphone de {contact.firstname} {contact.lastname}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {!contact.mobilePhoneNumber && !contact.fixPhoneNumber && <div>Aucun</div>}
                        {contact.mobilePhoneNumber &&
                        <Row>
                            <Col sm="4">
                                <strong>Mobile</strong>
                            </Col>
                            <Col sm="2">
                                {contact.mobilePhoneNumber}
                            </Col>
                        </Row>
                        }
                        {contact.fixPhoneNumber &&
                        <Row>
                            <Col sm="4">
                                <strong>Fix</strong>
                            </Col>
                            <Col sm="2">
                                {contact.fixPhoneNumber}
                            </Col>
                        </Row>
                        }
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>
    )
}

const ExhibitorInfos: FC<{ exhibitor: Company }> = ({exhibitor}) => (
    <Container fluid>
        <Accordion>
            <Card>
                <Card.Header className="text-center">
                    <Accordion.Toggle as={Button} variant="none" eventKey="0">
                        Contacts
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {exhibitor.contacts
                            .sort((c1, c2) => c1.lastname.localeCompare(c2.lastname))
                            .map((contact, index) => <ExhibitorInfosContactRow key={index} contact={contact}/>)}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header className="text-center">
                    <Accordion.Toggle as={Button} variant="none" eventKey="1">
                        Jeux
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body className="text-center">
                        {exhibitor.games.sort((g1, g2) => g1.name.localeCompare(g2.name)).map((game, index) => {
                            return (
                                <Row key={index}>
                                    <Col/>
                                    <Col>{game.name}</Col>
                                    <Col/>
                                </Row>
                            )
                        })}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    </Container>
)

export default ExhibitorInfos;
