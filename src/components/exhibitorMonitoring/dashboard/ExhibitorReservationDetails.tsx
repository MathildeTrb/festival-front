import {FC, useState} from "react";
import {ExhibitorMonitoring} from "../../../utils/types";
import {Row, Col, Button} from "react-bootstrap";
import {ImCalendar} from "react-icons/im";
import {BsPencilSquare} from "react-icons/bs";
import ModalCreateReservation from "../../reservation/ModalCreateReservation";
import {useAxiosMethods} from "../../../utils/axios-hooks";
import CalendarModal from "../CalendarModal";

const ExhibitorReservationDetails: FC<{ exhibitorMonitoring: ExhibitorMonitoring }> = ({exhibitorMonitoring}) => {

    console.log("exhibitorM", exhibitorMonitoring)

    let totalPrice: number = 0;

    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);

    const [mailingDate, setMailingDate] = useState<Date>();
    const [paymentDate, setPaymentDate] = useState<Date>();

    const [showModalMailingDate, setShowModalMailingDate] = useState<boolean>(false);
    const [showModalPaymentDate, setShowModalPaymentDate] = useState<boolean>(false);

    const [needVolunteer, setNeedVolunteer] = useState<boolean>(exhibitorMonitoring.reservation !== null ? exhibitorMonitoring.reservation.needVolunteer : false);
    const [willCome, setWillCome] = useState<boolean>( exhibitorMonitoring.reservation !== null ? exhibitorMonitoring.reservation.willCome : false);

    const {put: putReservationDate} = useAxiosMethods("reservations");
    const {put: putNeedVolunteer} = useAxiosMethods("reservations/needVolunteer");
    const {put: putWillCome} = useAxiosMethods("reservations/willCome");

    const onValidate = async () => {
        exhibitorMonitoring.reservation.mailingDate = mailingDate;
        exhibitorMonitoring.reservation.paymentDate = paymentDate;

        await putReservationDate({
            reservation: exhibitorMonitoring.reservation
        })
    }

    const updateNeedVolunteer = () => {
        exhibitorMonitoring.reservation.needVolunteer = !needVolunteer;

        putNeedVolunteer({
            reservation: exhibitorMonitoring.reservation
        })
            .then(() => setNeedVolunteer(!needVolunteer))
    }

    const updateWillCome = () => {
        exhibitorMonitoring.reservation.willCome = !willCome;

        putWillCome({
            reservation: exhibitorMonitoring.reservation
        })
            .then(() => setWillCome(!willCome))
    }

    return (
        <div>
            {!exhibitorMonitoring.reservation && <>Pas de réservation</>}
            {exhibitorMonitoring.reservation &&
            <>
                <table className="table table-hover table-bordered">
                    <thead className="thead-blue">
                    <tr>
                        <th scope="col">
                            Espace <BsPencilSquare className="p-cursor" onClick={() => setShowModalUpdate(true)}/>

                            <ModalCreateReservation show={showModalUpdate} onHide={() => setShowModalUpdate(false)} exhibitorMonitoring={exhibitorMonitoring}/>

                        </th>
                        <th scope="col">Nombre de tables</th>
                        <th scope="col">Nombre de m<sup>2</sup></th>
                        <th scope="col">Prix calculé</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        exhibitorMonitoring
                            .reservation
                            .reservationDetails
                            .sort((r1, r2) => r1.space.label.localeCompare(r2.space.label))
                            .map((reservationDetail, index) => {

                                const subPrice: number = reservationDetail.meterReserved * reservationDetail.space.meterPrice + reservationDetail.tableReserved * reservationDetail.space.tablePrice;

                                totalPrice += subPrice;

                                return (
                                    <tr key={index}>
                                        <td>{reservationDetail.space.label}</td>
                                        <td>{reservationDetail.tableReserved}</td>
                                        <td>{reservationDetail.meterReserved}</td>
                                        <td>{subPrice} €</td>
                                    </tr>
                                )
                            })
                    }
                    <tr>
                        <td colSpan={3}>Remise</td>
                        <td>{exhibitorMonitoring.reservation.discount} €</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>Prix total</td>
                        <td className={exhibitorMonitoring.reservation.paymentDate ? "yes-cell" : "td-red"}>{totalPrice - exhibitorMonitoring.reservation.discount} €</td>
                    </tr>
                    </tbody>
                </table>

                <Row className="text-center mt-4">
                    <Col>
                        <strong>Date d'envoi
                            : </strong><ImCalendar className="p-cursor" onClick={() => setShowModalMailingDate(true)}/> {exhibitorMonitoring.reservation.mailingDate ? new Date(exhibitorMonitoring.reservation.mailingDate).toLocaleDateString() : <>Pas
                        de date</>}
                        <CalendarModal title="Sélection de la date d'envoi" show={showModalMailingDate} onHide={() => setShowModalMailingDate(false)} date={mailingDate} setDate={setMailingDate} onValidate={onValidate}/>
                    </Col>
                    <Col>
                        <strong>Date de paiement
                            : </strong><ImCalendar className="p-cursor" onClick={() => setShowModalPaymentDate(true)}/> {exhibitorMonitoring.reservation.paymentDate ? new Date(exhibitorMonitoring.reservation.paymentDate).toLocaleDateString() : <>Pas
                        de date</>}
                        <CalendarModal title="Sélection de la date de paiement" show={showModalPaymentDate} onHide={() => setShowModalPaymentDate(false)} date={paymentDate} setDate={setPaymentDate} onValidate={onValidate}/>
                    </Col>
                </Row>
                <Row className="text-center mt-3">
                    <Col>
                        <button type="button" onClick={updateNeedVolunteer} className={needVolunteer ? "mon-validate-button" : "mon-delete-button"}>{needVolunteer ? "Besoin de volontaire" : "Pas besoin de volontaire"}</button>
                    </Col>
                    <Col>
                        <button type="button" onClick={updateWillCome} className={willCome ? "mon-validate-button" : "mon-delete-button"}>{willCome ? "Viens" : "Ne viens pas"}</button>
                    </Col>
                </Row>
            </>
            }
        </div>

    )
}

export default ExhibitorReservationDetails;
