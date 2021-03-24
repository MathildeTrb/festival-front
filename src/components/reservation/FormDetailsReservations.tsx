import {FC, useContext, useEffect, useState} from "react";
import {ReservationDetails, Space} from "../../utils/types";
import {Row} from "react-bootstrap";
import FormDetailsReservation from "./FormDetailsReservation";
import {FestivalContext} from "../../App";


type FormDetailsReservationsProps = {
    isSubmitted: boolean;
    createReservation: (reservationDetailsTab : ReservationDetails[]) => void;
}

const SpacesForm: FC<FormDetailsReservationsProps> = ({isSubmitted, createReservation}) => {

    const {selectedFestival} = useContext(FestivalContext);

    const [reservationDetails1, setReservationDetails1] = useState<ReservationDetails>()
    const [reservationDetails2, setReservationDetails2] = useState<ReservationDetails>()
    const [reservationDetails3, setReservationDetails3] = useState<ReservationDetails>()


    useEffect(() => {
        if (isSubmitted && reservationDetails1 && reservationDetails2 && reservationDetails3){
            const reservationsDetailsTab : ReservationDetails[] = [
                reservationDetails1, reservationDetails2, reservationDetails3
            ]
            createReservation(reservationsDetailsTab)
        }
    }, [reservationDetails1, reservationDetails2, reservationDetails3])

    return (
        <div>
            <Row>
                <FormDetailsReservation isSubmitted={isSubmitted} onSubmit={setReservationDetails1} space={selectedFestival.spaces[0]}/>
            </Row>
            <Row>
                <FormDetailsReservation isSubmitted={isSubmitted} onSubmit={setReservationDetails2} space={selectedFestival.spaces[1]}/>
            </Row>
            <Row>
                <FormDetailsReservation isSubmitted={isSubmitted} onSubmit={setReservationDetails3} space={selectedFestival.spaces[2]}/>
            </Row>
        </div>
    )
}

export default SpacesForm
