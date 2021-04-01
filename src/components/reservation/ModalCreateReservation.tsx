import {Button, Col, Modal, Row} from "react-bootstrap";
import {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState} from "react";
import {ExhibitorMonitoring, Festival, Reservation, ReservationDetails} from "../../utils/types";
import axios from "../../utils/axios";
import useAxios from "../../utils/useAxios";
import FormDetailsReservation from "./FormDetailsReservation";
import {FestivalContext} from "../../App";

type ReservationContextProps = {
    reservationDetails: ReservationDetails[];
    setReservationDetails: Dispatch<SetStateAction<ReservationDetails[]>>
}

export const ReservationContext = createContext<ReservationContextProps>({} as ReservationContextProps)

const ModalCreateReservation: FC<{show: boolean, onHide: () => void, exhibitorMonitoring?: ExhibitorMonitoring}> = ({show, onHide, exhibitorMonitoring}) => {

    const [needVolunteer, setNeedVolunter] = useState<boolean>(exhibitorMonitoring.reservation && exhibitorMonitoring.reservation.needVolunteer)
    const [willCome, setWillCome] = useState<boolean>(exhibitorMonitoring.reservation && exhibitorMonitoring.reservation.willCome)
    const [discount, setDiscount] = useState<number>(exhibitorMonitoring.reservation ? exhibitorMonitoring.reservation.discount : 0)
    const [reservationDetails, setReservationDetails] = useState<ReservationDetails[]>(exhibitorMonitoring.reservation ? exhibitorMonitoring.reservation.reservationDetails : [])

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    const {selectedFestival} = useContext(FestivalContext)

    const {data: concernedFestival, isPending} = useAxios<Festival>("festivals/"+selectedFestival.id)

    const reservationContextValue = {
        reservationDetails,
        setReservationDetails
    }

    const handleChange = set => event => {
        set(event.target.value)
    }

    const onSubmit = (newReservationDetails : ReservationDetails) => {
        setReservationDetails([...reservationDetails, newReservationDetails])
    }

    useEffect(() => {
        if(isSubmitted && (concernedFestival.spaces.length === reservationDetails.length)){
            createReservation()
        }
    }, [reservationDetails])

    const createReservation = () => {

        const reservation: Reservation = {
            needVolunteer,
            willCome,
            discount,
            reservationDetails: reservationDetails,
            exhibitorMonitoring,
        }


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
                <ReservationContext.Provider value={reservationContextValue}>
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
                        {concernedFestival && concernedFestival.spaces
                            .sort((s1, s2) => s1.label.localeCompare(s2.label))
                            .map(space =>
                            <FormDetailsReservation isSubmitted={isSubmitted} onSubmit={onSubmit} space={space} reservation={exhibitorMonitoring.reservation}/>
                        )}
                    </form>
                </ReservationContext.Provider>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setIsSubmitted(true)}>valider la réservation</Button>
                <Button onClick={onHide}>Annuler la réservation</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCreateReservation;
