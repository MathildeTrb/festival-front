import InfoReservation from "../infoReservation/InfoReservation";
import ListContactedNoAnswer from "./ListContactedNoAnswer";
import ListGamesNotReceived from "./ListGameNotReceived";
import ListGamesNotPlaced from "./ListGamesNotPlaced";
import ProgressionPeopleContacted from "./ProgressionPeopleContacted";
import ProgressionGamesReceived from "./ProgressionGamesReceived";
import ProgressionGamesNotPlaced from "./ProgressionGamesNotPlaced";
import {Container, Row} from "react-bootstrap";
const Home = () => {

    return (
        <div>
            <Container>
                <ProgressionPeopleContacted/>

                <ProgressionGamesReceived/>

                <ProgressionGamesNotPlaced></ProgressionGamesNotPlaced>
            </Container>

            <Container>
                <Row>
                    <InfoReservation></InfoReservation>

                    <ListGamesNotReceived/>

                    <ListGamesNotPlaced/>

                    <ListContactedNoAnswer/>
                </Row>

            </Container>



        </div>

    )
}

export default Home;
