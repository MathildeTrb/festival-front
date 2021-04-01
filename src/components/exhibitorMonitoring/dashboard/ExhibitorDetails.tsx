import {FC, useState} from "react";
import {ExhibitorMonitoring} from "../../../utils/types";
import {Col, Container, Form, Row} from "react-bootstrap";
import {ImCalendar} from "react-icons/im";
import CalendarModal from "../CalendarModal";
import axios from "../../../utils/axios";
import {useAxiosMethods} from "../../../utils/axios-hooks";

const ExhibitorDetails: FC<{exhibitorMonitoring: ExhibitorMonitoring}> = ({exhibitorMonitoring}) => {

    const [date1, setDate1] = useState<Date>(exhibitorMonitoring.dateContact1 ? new Date(exhibitorMonitoring.dateContact1) : null);
    const [date2, setDate2] = useState<Date>(exhibitorMonitoring.dateContact2 ? new Date(exhibitorMonitoring.dateContact2) : null);
    const [date3, setDate3] = useState<Date>(exhibitorMonitoring.dateContact3 ? new Date(exhibitorMonitoring.dateContact3) : null);

    const [updateComment, setUpdateComment] = useState<boolean>(false);
    const [comment, setComment] = useState<string>(exhibitorMonitoring.comment)

    const [showModal1, setShowModal1] = useState<boolean>(false);
    const [showModal2, setShowModal2] = useState<boolean>(false);
    const [showModal3, setShowModal3] = useState<boolean>(false);

    const {put: putComment} = useAxiosMethods("exhibitorMonitorings/comment");

    const onValidate = async () => {
        exhibitorMonitoring.dateContact1 = date1;
        exhibitorMonitoring.dateContact2 = date2;
        exhibitorMonitoring.dateContact3 = date3;

        await axios.put(
            "exhibitorMonitorings/date",
            {'exhibitorMonitoring': exhibitorMonitoring}
        );
    }

    const handleSubmit = async event => {
        event.preventDefault();

        exhibitorMonitoring.comment = comment;

        await putComment({
            exhibitorMonitoring
        })

        setUpdateComment(false);
    }

    return (
        <Container>
            <table className="table table-hover table-bordered">
                <thead>
                <tr>
                    <th scope="col">1<sup>er</sup> contact</th>
                    <th scope="col">2<sup>e</sup> contact</th>
                    <th scope="col">3<sup>e</sup> contact</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <ImCalendar onClick={() => setShowModal1(true)} className="p-cursor"/> {exhibitorMonitoring.dateContact1 ? new Date(exhibitorMonitoring.dateContact1).toLocaleDateString() : <>Pas
                        de 1<sup>er</sup> contact</>}
                        <CalendarModal title="Sélection de la date du premier contact" show={showModal1}
                                       onHide={() => setShowModal1(false)} date={date1} setDate={setDate1}
                                       onValidate={onValidate}/>
                    </td>
                    <td>
                        <ImCalendar
                            onClick={() => setShowModal2(true)} className="p-cursor"/> {exhibitorMonitoring.dateContact2 ? new Date(exhibitorMonitoring.dateContact2).toLocaleDateString() : <>Pas
                        de 2<sup>e</sup> contact</>}
                        <CalendarModal title="Sélection de la date du deuxième contact" show={showModal2}
                                       onHide={() => setShowModal2(false)} date={date2} setDate={setDate2}
                                       onValidate={onValidate}/>
                    </td>
                    <td>
                        <ImCalendar
                            onClick={() => setShowModal3(true)} className="p-cursor"/> {exhibitorMonitoring.dateContact3 ? new Date(exhibitorMonitoring.dateContact3).toLocaleDateString() : <>Pas
                        de 3<sup>e</sup> contact</>}
                        <CalendarModal title="Sélection de la date du troisième contact" show={showModal3}
                                       onHide={() => setShowModal3(false)} date={date3} setDate={setDate3}
                                       onValidate={onValidate}/>
                    </td>
                </tr>
                </tbody>
            </table>


            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                    <Col sm={9}>
                        <textarea className="form-control" rows={4} value={comment} onChange={event => setComment(event.target.value)} disabled={!updateComment}/>
                    </Col>
                    <Col className="text-center m-auto">
                        {
                            updateComment ? <button type="button" onClick={handleSubmit} className="mon-button">Valider</button> : <button type="button" onClick={() => setUpdateComment(true)} className="mon-delete-button">Modifier</button>
                        }
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default ExhibitorDetails;
