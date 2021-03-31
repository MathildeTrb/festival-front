import useAxios from "../../utils/useAxios";
import {ExhibitorMonitoring, ExhibitorMonitoringStatus, Game} from "../../utils/types";
import {FC, useContext, useEffect, useState} from "react";
import {FestivalContext} from "../../App";
import {Spinner} from "react-bootstrap";
import ExhibitorMonitoringRow from "./ExhibitorMonitoringRow";

const ExhibitorMonitoringList: FC = () => {

    const {selectedFestival} = useContext(FestivalContext);
    const {
        data: exhibitorMonitorings,
        isPending
    } = useAxios<ExhibitorMonitoring[]>("exhibitorMonitorings/" + selectedFestival.id)

    useEffect(() => {
        document.title = "Suivi des exposants";
    })

    return (
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {exhibitorMonitorings &&
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">Exposant</th>
                    <th scope="col">1<sup>er</sup> contact</th>
                    <th scope="col">2<sup>e</sup> contact</th>
                    <th scope="col">3<sup>e</sup> contact</th>
                    <th scope="col">Commentaire</th>
                    <th scope="col">Statut</th>
                    <th scope="col">Réservation</th>
                    <th scope="col"/>
                </tr>
                </thead>
                <tbody>
                {exhibitorMonitorings.map((exhibitorMonitoring, index) => <ExhibitorMonitoringRow key={index} exhibitorMonitoring={exhibitorMonitoring}/>)}
                </tbody>
            </table>

            }
        </div>
    )

}

export default ExhibitorMonitoringList;
