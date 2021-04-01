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
                <Row>
                    <InfoReservation/>

                    <ListGamesNotReceived/>

                    <ListGamesNotPlaced/>

                    <ListContactedNoAnswer/>
                </Row>

            </Container>
            <Container>
                <ProgressionPeopleContacted/>

                <ProgressionGamesReceived/>

                <ProgressionGamesNotPlaced/>
            </Container>



        </div>

    )
}

export default Home;
