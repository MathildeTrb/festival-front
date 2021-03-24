import Calendar from 'react-calendar'
import "../../css/sample.css"
import {Button, Modal} from "react-bootstrap";
import {FC} from "react";

const CalendarModal: FC<{ show: boolean, onHide: () => void, date: any, setDate: (any) => void, onValidate:() => void }> = ({show, onHide, date, setDate, onValidate}) => {

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
                    Sélection d'une date de contact
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Calendar value={date} onChange={onChange}/>
                {/*"date séléctionnée" + date ? date.toString() : "pas de date"*/}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClick}>valider</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CalendarModal;
