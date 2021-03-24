import Calendar from 'react-calendar'
import "../../css/sample.css"
import {Button, Col, Modal, Row} from "react-bootstrap";
import {FC} from "react";

const CalendarModal: FC<{ title: string, show: boolean, onHide: () => void, date: Date, setDate: (any) => void, onValidate:() => void }> = ({ title, show, onHide, date, setDate, onValidate}) => {

    const onChange = date => {
        const newDate = new Date(new Date(date).setHours(6))
        setDate(newDate)
    }

    const onClick = () => {
        onValidate();
        onHide();
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
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col/>
                    <Col><Calendar value={date} onChange={onChange}/></Col>
                    <Col/>
                </Row>
                <Row>
                    <Col/>
                    <Col className="text-center"><strong>Date sélectionnée :</strong> {date ? date.toLocaleDateString() : "Pas de date"}</Col>
                    <Col/>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" onClick={onClick}>Valider</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CalendarModal;
