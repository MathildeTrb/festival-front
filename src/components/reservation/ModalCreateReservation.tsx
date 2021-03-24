import {Button, Col, Modal, Row} from "react-bootstrap";
import {FC, useContext, useState} from "react";
import {FestivalContext} from "../../App";
import FormDetailsReservation from "./FormDetailsReservation";
import {ExhibitorMonitoring, Reservation, ReservationDetails} from "../../utils/types";
import FormDetailsReservations from "./FormDetailsReservations";
import axios from "../../utils/axios";
import {log} from "util";

const ModalCreateReservation: FC<{show: boolean, onHide: () => void, exhibitorMonitoring: ExhibitorMonitoring}> = ({show, onHide, exhibitorMonitoring}) => {

    const {selectedFestival} = useContext(FestivalContext);

    const [needVolunteer, setNeedVolunter] = useState<boolean>(false)
    const [willCome, setWillCome] = useState<boolean>(false)
    const [comment, setComment] = useState<string>(null)
    const [discount, setDiscount] = useState<number>(0)

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    const handleChange = set => event => {
        set(event.target.value)
    }

    const createReservation = (reservationDetailsTab : ReservationDetails[]) => {

        const reservation: Reservation = {
            needVolunteer,
            willCome,
            comment,
            discount,
            reservationsDetails: reservationDetailsTab,
            exhibitorMonitoring,
        }

        console.log("je crée ma réservation avec ")
        console.log(reservation)

        axios.post("reservations", {
            reservation : reservation
        })
        onHide()
    }

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
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <Row>
                        <Col>
                            <label>Besoin de bénévoles ? </label>
                            <button type="button" className={needVolunteer ? "mon-validate-button" : "mon-delete-button"}
                                    onClick={() => setNeedVolunter(value => !value)}>{needVolunteer ? "Oui" : "Non"}</button>
                        </Col>
                        <Col>
                            <label>L'exposant se déplace ? </label>
                            <button type="button" className={willCome ? "mon-validate-button" : "mon-delete-button"}
                                    onClick={() => setWillCome(value => !value)}>{willCome ? "Oui" : "Non"}</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Commentaires de le réservation : </label>
                            <textarea
                                className="mon-input"
                                value={comment}
                                onChange={handleChange(setComment)}
                            />
                        </Col>
                        <Col>
                            <label>Remise sur la réservation : </label>
                            <input
                                type="int"
                                value={discount}
                                required
                                onChange={handleChange(setDiscount)}
                                min={0}
                            />
                        </Col>
                    </Row>
                    <FormDetailsReservations isSubmitted={isSubmitted} createReservation={createReservation}/>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setIsSubmitted(true)}>valider la réservation</Button>
                <Button onClick={onHide}>Annuler la réservation</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCreateReservation;
