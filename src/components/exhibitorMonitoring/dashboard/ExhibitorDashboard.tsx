import {FC, useContext, useEffect} from "react";
import {Row, Col, Container, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import ExhibitorReservationDetails from "./ExhibitorReservationDetails";
import ExhibitorInfos from "./ExhibitorInfos";
import useAxios from "../../../utils/useAxios";
import {ExhibitorMonitoring} from "../../../utils/types";
import {FestivalContext} from "../../../App";
import ExhibitorGameMonitorings from "./ExhibitorGameMonitorings";
import ExhibitorDetails from "./ExhibitorDetails";

const ExhibitorDashboard: FC = () => {

    const {idExhibitor} = useParams<{ idExhibitor: number }>();

    const {selectedFestival} = useContext(FestivalContext);

    const {data: exhibitorMonitoring, isPending} = useAxios<ExhibitorMonitoring>(`exhibitorMonitorings/${idExhibitor}/dashboard/${selectedFestival.id}`);

    useEffect(() => {
        if (exhibitorMonitoring) {
            document.title = `Dashboard ${exhibitorMonitoring.exhibitor.name}`
        }
    }, [exhibitorMonitoring])

    return (
        <>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {exhibitorMonitoring &&
            <Container fluid>
                <div className="text-center mb-5">
                    <h1>{exhibitorMonitoring.exhibitor.name}</h1>
                </div>

                <Row>
                    <Col>
                        <Row className="mb-5">
                            <ExhibitorInfos exhibitor={exhibitorMonitoring.exhibitor}/>
                        </Row>
                        <Row>
                            <ExhibitorDetails exhibitorMonitoring={exhibitorMonitoring}/>
                        </Row>
                    </Col>
                    <Col>
                        <ExhibitorReservationDetails exhibitorMonitoring={exhibitorMonitoring}/>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <ExhibitorGameMonitorings exhibitorMonitoring={exhibitorMonitoring}/>
                </Row>
            </Container>
            }
        </>
    )
}

export default ExhibitorDashboard
