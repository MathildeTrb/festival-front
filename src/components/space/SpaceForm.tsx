import {useEffect, useState} from "react";
import {Col, Container, Form, Row} from "react-bootstrap";
import {Space} from "../../utils/types";

const SpaceForm = ({onSubmit, isSubmitted}) => {
    
    const [label, setLabel] = useState<string>()
    const [tablePrice, setTablePrice] = useState<number>()
    const [tableNumber, setTableNumber] = useState<number>()
    const [meterPrice, setMeterPrice] = useState<number>()

    const handleChange = set => event => {
        set(event.target.value)
    }

    useEffect(() => {
        if (isSubmitted){
            const space : Space = {
                label,
                tablePrice,
                meterPrice,
                tableTotal : tableNumber
            }
            onSubmit(space)
        }
    }, [isSubmitted])

    return (
        <Container fluid>
            <Row>
                <Col>
                    <label>Nom : </label>
                    <input
                        className="mon-input"
                        type="text"
                        required
                        value={label}
                        onChange={handleChange(setLabel)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <label>prix d'une table : </label>
                    <input
                        className="mon-input"
                        required
                        value={tablePrice}
                        onChange={handleChange(setTablePrice)}>
                    </input>
                </Col>
                <Col>
                    <label>nombre de table : </label>
                    <input
                        className="mon-input"
                        type="text"
                        required
                        value={tableNumber}
                        onChange={handleChange(setTableNumber)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <label>prix du mètre carré : </label>
                    <input
                        className="mon-input"
                        type="text"
                        required
                        value={meterPrice}
                        onChange={handleChange(setMeterPrice)}
                    />
                    <label>nombre de mètre carré : </label>
                    <input
                        className="mon-input"
                        type="text"
                        required
                        value={tableNumber? tableNumber * 6 : 0}
                        disabled
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default SpaceForm;
