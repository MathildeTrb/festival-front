import React, {createRef, FC} from 'react';
import {Reservation} from "./types";
import {Table} from "react-bootstrap";

const ref = React.createRef();



const PDF = (props) => {

    return (
        <>
            <div id="tab">
                <img src="/src/pictures/logo_FDJ_FINAL_800.png"/>
                <h1>Exposant : `{props.reservation.exhibitorMonitoring.exhibitor.name}`</h1>
                <Table striped bordered hover size={"sm"}>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Nb tables</th>
                        <th>Prix table</th>
                        <th>Nb m2</th>
                        <th>Prix m2</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.reservationDetails.map(reservationDetail => {
                            return (
                                <tr>
                                    <td>{reservationDetail.space.label}</td>
                                    <td>{reservationDetail.tableReserved}</td>
                                    <td>{reservationDetail.space.tablePrice}</td>
                                    <td>{reservationDetail.meterReserved}</td>
                                    <td>{reservationDetail.space.meterPrice}</td>
                                    <td>{reservationDetail.tableReserved * reservationDetail.space.tablePrice + reservationDetail.meterReserved * reservationDetail.space.meterPrice}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <Pdf targetRef={ref} filename={"post.pdf"}>
                    {console.log("pp")}
                </Pdf>
            </div>

        </>
    )
}
export default PDF;
