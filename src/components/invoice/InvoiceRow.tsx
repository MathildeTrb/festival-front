import {FC, useState} from "react";
import {Reservation} from "../../utils/types";
import {ImCalendar} from "react-icons/im";
import CalendarModal from "../exhibitorMonitoring/CalendarModal";
import axios from "../../utils/axios";
import {Button} from "react-bootstrap";
import PDFBlabla from "../../utils/PDFBlabla";
import PDF from "../../utils/PDF";

const InvoiceRow: FC<{reservation: Reservation}> = ({reservation}) => {

    const [mailingDate, setMailingDate] = useState<Date>();
    const [paymentDate, setPaymentDate] = useState<Date>();

    const [showModalMailingDate, setShowModalMailingDate] = useState<boolean>(false);
    const [showModalPaymentDate, setShowModalPaymentDate] = useState<boolean>(false);

    const amount: number = reservation.reservationDetails
        .map<number>((reservationDetail) => reservationDetail.meterReserved * reservationDetail.space.meterPrice + reservationDetail.tableReserved * reservationDetail.space.tablePrice)
        .reduce((total, currentValue) => total + currentValue);

    const onValidate = async () => {
        reservation.mailingDate = mailingDate;
        reservation.paymentDate = paymentDate;

        await axios.put("reservations", {
            reservation
        })
    }

    let state = {
        title: '',
        content: '',
        image:''
    }


    return (
        <tr>
            <td>{reservation.exhibitorMonitoring.exhibitor.name}</td>
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
                <Button variant={"info"}>Générer PDF</Button>
                <PDF reservation={reservation} montantRemise={amount - reservation.discount} montant={amount}></PDF>

            </td>
        </tr>
    )
}

export default InvoiceRow;
