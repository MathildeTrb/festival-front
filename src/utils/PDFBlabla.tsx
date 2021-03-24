import React, {createRef, FC} from 'react';
import {Reservation} from "./types";
import {Table} from "react-bootstrap";

const ref = React.createRef();

const PDFBlabla: FC<{props: Reservation, montantRemise: number, montant: number}> = ({props, montantRemise, montant}) => {

    const ref = createRef<HTMLInputElement>()

    return (
        <>
            <div className="Post" ref={ref}>
                <img src="/src/pictures/logo_FDJ_FINAL_800.png"/>
                <h1>Exposant : `{props.exhibitorMonitoring.exhibitor.name}`</h1>
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
                <p>Montant : {montant}</p>
                {montant === montantRemise && <p>Montant remisé = {montant} - {montant + montantRemise} = {montantRemise}</p>}
            </div>

        </>
    )
}
export default PDFBlabla;

