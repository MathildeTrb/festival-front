import {Button, Col, Modal, Row} from "react-bootstrap";
import {FC, useState} from "react";
import {Reservation} from "../../utils/types";


const ModalDetailsReservation: FC<{show: boolean, onHide: () => void, reservation: Reservation}> = ({show, onHide, reservation}) => {

    const amount: number = reservation.reservationDetails
        .map<number>((reservationDetail) => reservationDetail.meterReserved * reservationDetail.space.meterPrice + reservationDetail.tableReserved * reservationDetail.space.tablePrice)
        .reduce((total, currentValue) => total + currentValue);

    const amountReturnedGames: number = reservation.gameMonitorings
        .map<number>((gameMonitoring) => gameMonitoring.returnedPrice)
        .reduce((total, currentValue) => total + currentValue)

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Détails de la réservation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <Row>
                        <Col>
                            {
                                reservation.needVolunteer ?
                                    <p>Besoin de bénévoles</p>:
                                    <p>Pas besoin de bénévoles</p>
                            }
                        </Col>
                        <Col>
                            <p>Montant de la réservation : {amount} €</p>
                            {reservation.discount ?
                                <p>Réduction de : {reservation.discount}</p>:
                                <></>
                            }
                            {amountReturnedGames !== 0 ?
                                <p>Ajout de : {amountReturnedGames}</p>:
                                <></>
                            }
                            <p>Le montant final de la réservation vaut {amount - reservation.discount + amountReturnedGames}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {
                                reservation.willCome ?
                                    <p>L'exposant se déplacera</p>:
                                    <p>L'exposant ne se déplacera pas</p>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Fermer</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDetailsReservation;
