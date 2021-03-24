import {FC} from "react";
import {Accordion, Card, Container, Row, Col, Button} from "react-bootstrap";
import {Company} from "../../../utils/types";

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
                        {exhibitor.contacts.sort((c1, c2) => c1.lastname.localeCompare(c2.lastname)).map((contact, index) => {
                            return (
                                <Row key={index}>
                                    <Col>{contact.lastname}</Col>
                                    <Col>{contact.firstname}</Col>
                                    <Col>{contact.mail}</Col>
                                </Row>
                            )
                        })}
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
