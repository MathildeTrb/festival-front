import {FC} from "react";
import {ExhibitorMonitoring} from "../../../utils/types";
import {Container} from "react-bootstrap";

const ExhibitorGameMonitorings: FC<{ exhibitorMonitoring: ExhibitorMonitoring}> = ({exhibitorMonitoring}) => {

    return (

        <>
            {!exhibitorMonitoring.reservation && <div>Pas de game monitorings</div>}
            {exhibitorMonitoring.reservation &&

            <Container fluid>
                <div className="text-center">
                    <h3>Liste des jeux de la réservation</h3>
                </div>

                <table className="table table-hover table-bordered">
                    <thead className="thead-blue">
                    <tr>
                        <th scope="col">Nom</th>
                        {/* <th scope="col">Quantite exposition</th>
                <th scope="col">Quantité tombola</th>
                <th scope="col">Quantité dons</th>*/}
                        <th scope="col">Statut</th>
                        <th scope="col">Zone</th>
                        <th scope="col">Placé</th>
                        {/*<th scope="col">Besoin d'être retourné</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        exhibitorMonitoring.reservation.gameMonitorings
                            .sort((gm1, gm2) => gm1.game.name.localeCompare(gm2.game.name))
                            .map((gamesMonitoring, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{gamesMonitoring.game.name}</td>
                                        {/*<td>{gamesMonitoring.quantityExposed}</td>
                                <td>{gamesMonitoring.quantityTombola}</td>
                                <td>{gamesMonitoring.quantityDonation}</td>*/}
                                        <td>{gamesMonitoring.status.label}</td>
                                        <td>{gamesMonitoring.area.label}</td>
                                        <td>{gamesMonitoring.isPlaced ? "Oui" : "Non"}</td>
                                        {/*<td>
                                    {gamesMonitoring.needBeingReturned ? <>Oui
                                        ({gamesMonitoring.returnedPrice} €)</> : <>Non</>}
                                </td>*/}

                                    </tr>
                                )
                            })
                    }
                    </tbody>
                </table>
            </Container>
            }
        </>


    )
}

export default ExhibitorGameMonitorings;
