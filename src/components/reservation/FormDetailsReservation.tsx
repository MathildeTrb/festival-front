import {FC, useContext, useEffect, useState} from "react";
import {ReservationDetails, Space} from "../../utils/types";
import {Col, Row} from "react-bootstrap";

const FormDetailsReservation: FC<{ isSubmitted: boolean, onSubmit:(ReservationDetails) => void, space: Space}> = ({isSubmitted, onSubmit, space}) => {

    const [tableReserved, setTableReserved] = useState<number>(0)
    const [meterReserved, setMeterReserved] = useState<number>(0)

    const handleChange = set => event => {
        set(event.target.value)
    }

    useEffect(() => {
        const reservationDetail : ReservationDetails = {
            tableReserved,
            meterReserved,
            space
        }
        console.log("J'ai créé une réservationDetails")
        console.log(reservationDetail)
        onSubmit(reservationDetail)
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
