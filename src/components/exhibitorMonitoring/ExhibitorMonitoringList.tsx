import useAxios from "../../utils/useAxios";
import {ExhibitorMonitoring, ExhibitorMonitoringStatus, Game} from "../../utils/types";
import {FC, useContext, useEffect, useState} from "react";
import {FestivalContext} from "../../App";
import {Col, Row, Spinner} from "react-bootstrap";
import ExhibitorMonitoringRow from "./ExhibitorMonitoringRow";
import {useAxiosMethods} from "../../utils/axios-hooks";
import {VscDiffAdded} from "react-icons/vsc";
import ExhibitorMonitoringCreateModal from "./ExhibitorMonitoringCreateModal";

const ExhibitorMonitoringList: FC = () => {

    const {put} = useAxiosMethods("exhibitorMonitorings/status")

    const {selectedFestival} = useContext(FestivalContext);
    const {
        data: exhibitorMonitorings,
        setData: setExhibitorMonitorings,
        isPending
    } = useAxios<ExhibitorMonitoring[]>("exhibitorMonitorings/" + selectedFestival.id)

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);


    useEffect(() => {
        document.title = "Suivi des exposants";
    })

    const statusConsiderateAbsent: ExhibitorMonitoringStatus = {
        id: 5,
        label: "Considéré absent"
    }

    const handleCreate = (exhibitorMonitoring: ExhibitorMonitoring) => {
        console.log(exhibitorMonitoring)
        setExhibitorMonitorings([...exhibitorMonitorings, exhibitorMonitoring])
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

                <h1 className="text-center mb-5">
                    Suivi des exposants du festival
                </h1>
                <Row>
                    <Col sm={2}>
                        <button type="button" className="mon-button mb-2" onClick={() => setShowModalCreate(true)}><p><VscDiffAdded/> Ajout d'un suivi</p></button>
                        <ExhibitorMonitoringCreateModal show={showModalCreate} onHide={() => setShowModalCreate(false)} onCreate={handleCreate}/>
                    </Col>
                    <Col sm={8}/>
                    <Col sm={2}>
                        <button className="mon-delete-button mb-2" onClick={putConsideratedAbsent}>Considéré absent</button>
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
