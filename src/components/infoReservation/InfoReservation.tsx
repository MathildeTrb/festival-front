import useAxios from "../../utils/useAxios";
import {FestivalContext} from "../../App";
import {ExhibitorMonitoring} from "../../utils/types";
import {useContext} from "react";
import {Card, Spinner} from "react-bootstrap";


const InfoReservation = () => {

    const {selectedFestival} = useContext(FestivalContext);
    console.log("exhibitorMonitorings/festival/"+selectedFestival.id)

    const {data: reservationConfirmedTab,isPending } = useAxios<ExhibitorMonitoring[]>("exhibitorMonitorings/festival/"+selectedFestival.id);
    console.log(reservationConfirmedTab)

    return(
        <>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {reservationConfirmedTab &&
            <Card style={{ width: '20rem' }}>
                <Card.Body>
                    <Card.Title>Nombre d'exposants</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{"" + reservationConfirmedTab.length}</Card.Subtitle>
                    <Card.Text>
                        On va être nombreux et ça sera génial !
                    </Card.Text>
                </Card.Body>
            </Card>

            }
        </>
    )
}

export default InfoReservation;
