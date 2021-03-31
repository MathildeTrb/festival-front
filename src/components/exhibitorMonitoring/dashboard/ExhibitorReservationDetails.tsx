import {FC, useState} from "react";
import {ExhibitorMonitoring} from "../../../utils/types";
import {Row, Col} from "react-bootstrap";
import {ImCalendar} from "react-icons/im";
import {BsPencilSquare} from "react-icons/bs";
import ModalCreateReservation from "../../reservation/ModalCreateReservation";

const ExhibitorReservationDetails: FC<{ exhibitorMonitoring: ExhibitorMonitoring }> = ({exhibitorMonitoring}) => {

    let totalPrice: number = 0;

    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);

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
                            .map(reservationDetail => {

                                const subPrice: number = reservationDetail.meterReserved * reservationDetail.space.meterPrice + reservationDetail.tableReserved * reservationDetail.space.tablePrice;

                                totalPrice += subPrice;

                                return (
                                    <tr>
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

                <Row>
                    <Col>
                        <strong>Date d'envoi
                            : </strong><ImCalendar/> {exhibitorMonitoring.reservation.mailingDate ? new Date(exhibitorMonitoring.reservation.mailingDate).toLocaleDateString() : <>Pas
                        de date</>}
                    </Col>
                    <Col>
                        <strong>Date de paiement
                            : </strong><ImCalendar/> {exhibitorMonitoring.reservation.paymentDate ? new Date(exhibitorMonitoring.reservation.paymentDate).toLocaleDateString() : <>Pas
                        de date</>}
                    </Col>
                </Row>
            </>
            }
        </div>

    )
}

export default ExhibitorReservationDetails;
