import {FC, useState} from "react";
import {Reservation} from "../../utils/types";
import {ImCalendar} from "react-icons/im";
import CalendarModal from "../exhibitorMonitoring/CalendarModal";
import axios from "../../utils/axios";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
const InvoiceRow: FC<{reservation: Reservation}> = ({reservation}) => {

    const [mailingDate, setMailingDate] = useState<Date>();
    const [paymentDate, setPaymentDate] = useState<Date>();

    const [showModalMailingDate, setShowModalMailingDate] = useState<boolean>(false);
    const [showModalPaymentDate, setShowModalPaymentDate] = useState<boolean>(false);

    const amount: number = reservation.reservationDetails
        .map<number>((reservationDetail) => reservationDetail.meterReserved * reservationDetail.space.meterPrice + reservationDetail.tableReserved * reservationDetail.space.tablePrice)
        .reduce((total, currentValue) => total + currentValue, 0);

    const onValidate = async () => {
        reservation.mailingDate = mailingDate;
        reservation.paymentDate = paymentDate;

        await axios.put("reservations", {
            reservation
        })
    }

    return (
        <tr>
            <td><Link to={`/dashboard/${reservation.exhibitorMonitoring.exhibitor.id}`}>{reservation.exhibitorMonitoring.exhibitor.name}</Link></td>
            <td>{amount} €</td>
            <td>{amount - reservation.discount} €</td>
            <td>
                <ImCalendar onClick={() => setShowModalMailingDate(true)}/> {reservation.mailingDate ? new Date(reservation.mailingDate).toLocaleDateString() : "Pas de date"}
                <CalendarModal title="Sélection de la date d'envoi" show={showModalMailingDate} onHide={() => setShowModalMailingDate(false)} date={mailingDate} setDate={setMailingDate} onValidate={onValidate}/>
            </td>
            <td>
                <ImCalendar onClick={() => setShowModalPaymentDate(true)}/> {reservation.paymentDate ? new Date(reservation.paymentDate).toLocaleDateString() : "Pas de date"}
                <CalendarModal title="Sélection de la date de paiement" show={showModalPaymentDate} onHide={() => setShowModalPaymentDate(false)} date={paymentDate} setDate={setPaymentDate} onValidate={onValidate}/>
            </td>
            <td>
                <Button variant="primary">Générer PDF</Button>
            </td>
        </tr>
    )
}

export default InvoiceRow;
