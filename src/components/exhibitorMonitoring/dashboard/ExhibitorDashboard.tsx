import {FC, useContext} from "react";
import {Row, Col, Container, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import ExhibitorReservationDetails from "./ExhibitorReservationDetails";
import ExhibitorInfos from "./ExhibitorInfos";
import useAxios from "../../../utils/useAxios";
import {ExhibitorMonitoring} from "../../../utils/types";
import {FestivalContext} from "../../../App";
import ExhibitorGameMonitorings from "./ExhibitorGameMonitorings";

const ExhibitorDashboard: FC = () => {

    const {idExhibitor} = useParams<{ idExhibitor: number }>();

    const {selectedFestival} = useContext(FestivalContext);

    const {data: exhibitorMonitoring, isPending} = useAxios<ExhibitorMonitoring>(`exhibitorMonitorings/${idExhibitor}/dashboard/${selectedFestival.id}`);

    return (
        <>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {exhibitorMonitoring &&
            <Container fluid>

                <div className="text-center mb-4">
                    <h1>{exhibitorMonitoring.exhibitor.name}</h1>
                </div>

                <Row>
                    <Col>
                        <ExhibitorInfos exhibitor={exhibitorMonitoring.exhibitor}/>
                    </Col>
                    <Col>
                        <ExhibitorReservationDetails exhibitorMonitoring={exhibitorMonitoring}/>
                    </Col>
                </Row>
                <Row>
                    <Col>5</Col>
                    <Col>
                        <ExhibitorGameMonitorings gamesMonitorings={exhibitorMonitoring.reservation.gameMonitorings}/>
                    </Col>
                </Row>
            </Container>
            }
        </>
    )
}

export default ExhibitorDashboard;
