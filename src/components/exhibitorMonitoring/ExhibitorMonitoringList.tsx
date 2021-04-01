import useAxios from "../../utils/useAxios";
import {ExhibitorMonitoring, ExhibitorMonitoringStatus, Game} from "../../utils/types";
import {FC, useContext, useEffect, useState} from "react";
import {FestivalContext} from "../../App";
import {Col, Row, Spinner} from "react-bootstrap";
import ExhibitorMonitoringRow from "./ExhibitorMonitoringRow";
import {useAxiosMethods} from "../../utils/axios-hooks";

const ExhibitorMonitoringList: FC = () => {

    const {put} = useAxiosMethods("exhibitorMonitorings/status")

    const {selectedFestival} = useContext(FestivalContext);
    const {
        data: exhibitorMonitorings,
        setData: setExhibitorMonitorings,
        isPending
    } = useAxios<ExhibitorMonitoring[]>("exhibitorMonitorings/" + selectedFestival.id)

    useEffect(() => {
        document.title = "Suivi des exposants";
    })

    const statusConsiderateAbsent: ExhibitorMonitoringStatus = {
        id: 5,
        label: "Considéré absent"
    }

    const putConsideratedAbsent = () => {
        exhibitorMonitorings
            .filter(
                exhibitorMonitoring => exhibitorMonitoring.status.label === "Contacté sans réponse" || exhibitorMonitoring.status.label === "Pas contacté"
            )
            .forEach(async exhibitorMonitoring => {
                exhibitorMonitoring.status = statusConsiderateAbsent
                // await put({exhibitorMonitoring: exhibitorMonitoring})
                const exhibitorMonitoringsTab: ExhibitorMonitoring[] = [...exhibitorMonitorings]
                const index: number = exhibitorMonitoringsTab
                    .findIndex(
                        e => e.festival.id === exhibitorMonitoring.festival.id && e.exhibitor.id === exhibitorMonitoring.exhibitor.id
                    )
                exhibitorMonitoringsTab[index] = exhibitorMonitoring
                setExhibitorMonitorings(exhibitorMonitoringsTab)
            })
    }

    return (
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {exhibitorMonitorings &&

            <>
                <Row>
                    <Col md={10}/>
                    <Col>
                        <button className="mon-delete-button btn " onClick={putConsideratedAbsent}>Considéré absent
                        </button>
                    </Col>
                </Row>
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
                    {exhibitorMonitorings.map((exhibitorMonitoring, index) => <ExhibitorMonitoringRow key={index}
                                                                                                      exhibitorMonitoring={exhibitorMonitoring}/>)}
                    </tbody>
                </table>
            </>

            }
        </div>
    )

}

export default ExhibitorMonitoringList;
