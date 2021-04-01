import {FC, useContext, useEffect, useState} from "react";
import {Reservation, ReservationDetails, Space} from "../../utils/types";
import {Col, Row} from "react-bootstrap";
import {ReservationContext} from "./ModalCreateReservation";

const FormDetailsReservation: FC<{ isSubmitted: boolean, onSubmit:(reservationDetails : ReservationDetails) => void, space: Space, reservation?: Reservation}> = ({isSubmitted, onSubmit, space, reservation}) => {

    const reservationDetail: ReservationDetails = reservation ? reservation.reservationDetails
        .filter(rd => rd.space.id === space.id)[0]
        :
        undefined;

    const [tableReserved, setTableReserved] = useState<number>(reservationDetail ? reservationDetail.tableReserved : 0);
    const [meterReserved, setMeterReserved] = useState<number>(reservationDetail ? reservationDetail.meterReserved : 0);

    const {setReservationDetails} = useContext(ReservationContext);

    const handleChange = set => event => {
        set(event.target.value)
    }

    useEffect(() => {
        if (isSubmitted){
            const reservationDetail : ReservationDetails = {
                tableReserved,
                meterReserved,
                space
            }
            setReservationDetails(prevState => [...prevState, reservationDetail])
        }

    }, [isSubmitted])

    return (
        <>
            <Row>
                <Col>
                    <label>
                        {tableReserved > 1 ?
                            <>tables réservées pour l'espace {space.label}</>
                            : <> table réservée pour l'espace {space.label}</>}
                    </label>
                    <input
                        type="number"
                        required
                        value={tableReserved}
                        onChange={handleChange(setTableReserved)}
                        min={0}
                    />
                </Col>
                <Col>
                    <label>
                        {meterReserved > 1 ?
                            <>mètres réservés pour l'espace {space.label}</>
                            : <> mètre réservé pour l'espace {space.label}</>}
                    </label>
                    <input
                        type="number"
                        required
                        value={meterReserved}
                        onChange={handleChange(setMeterReserved)}
                        min={0}
                    />
                </Col>
            </Row>
        </>
    )
}

export default FormDetailsReservation
