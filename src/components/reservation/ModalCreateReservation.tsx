import {Button, Col, Modal, Row} from "react-bootstrap";
import {FC, useEffect, useState} from "react";
import {ExhibitorMonitoring, Festival, Reservation, ReservationDetails} from "../../utils/types";
import axios from "../../utils/axios";
import useAxios from "../../utils/useAxios";
import FormDetailsReservation from "./FormDetailsReservation";

const ModalCreateReservation: FC<{show: boolean, onHide: () => void, exhibitorMonitoring: ExhibitorMonitoring}> = ({show, onHide, exhibitorMonitoring}) => {

    const [needVolunteer, setNeedVolunter] = useState<boolean>(false)
    const [willCome, setWillCome] = useState<boolean>(false)
    const [discount, setDiscount] = useState<number>(0)
    const [reservationDetails, setReservationDetails] = useState<ReservationDetails[]>([])

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    const {data: concernedFestival, isPending} = useAxios<Festival>("festivals/"+exhibitorMonitoring.festival.id)

    const handleChange = set => event => {
        set(event.target.value)
    }

    const onSubmit = (newReservationDetails : ReservationDetails) => {
        setReservationDetails([...reservationDetails, newReservationDetails])
    }

    useEffect(() => {
        console.log(reservationDetails)
        console.log(isSubmitted && (concernedFestival.spaces.length === reservationDetails.length))
        if(isSubmitted && (concernedFestival.spaces.length === reservationDetails.length)){
            createReservation()
        }
    }, [isSubmitted, reservationDetails, setReservationDetails])

    const createReservation = () => {

        const reservation: Reservation = {
            needVolunteer,
            willCome,
            discount,
            reservationDetails: reservationDetails,
            exhibitorMonitoring,
        }

        console.log("J'ai créé ma ma réservation")
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
                    {isPending && <p>je suis en train de charger</p>}
                    {concernedFestival ? console.log(concernedFestival) : console.log("festival en cours de chargement")}
                    {concernedFestival && concernedFestival.spaces.map(space =>
                        <FormDetailsReservation isSubmitted={isSubmitted} onSubmit={onSubmit} space={space}/>
                    )}
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
