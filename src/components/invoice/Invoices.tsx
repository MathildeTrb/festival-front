import {FC, useContext, useEffect} from "react";
import useAxios from "../../utils/useAxios";
import {Spinner} from "react-bootstrap";
import {Reservation} from "../../utils/types";
import {FestivalContext} from "../../App";
import InvoiceRow from "./InvoiceRow";

const Invoices: FC = () => {

    const {selectedFestival} = useContext(FestivalContext);

    const {data: reservations, isPending, setData: setReservations} = useAxios<Reservation[]>(`reservations/festival/${selectedFestival.id}`);

    useEffect(() => {
        document.title = "Liste des factures";
    })

    return (
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {reservations && reservations.length !== 0 &&
            <>
                <h1 className="text-center mb-5">Liste des factures</h1>

                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Exposant</th>
                        <th scope="col">Montant (avant remise)</th>
                        <th scope="col">Montant (après remise)</th>
                        <th scope="col">Date d'envoi</th>
                        <th scope="col">Date de paiement</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reservations.map((reservation, index) => <InvoiceRow key={index} reservation={reservation}/>)}
                    </tbody>
                </table>
            </>
            }
            {reservations && reservations.length === 0 && <div>Aucune donnée à afficher</div>}
        </div>
    )
}

export default Invoices;
