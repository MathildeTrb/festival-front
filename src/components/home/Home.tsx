import InfoReservation from "../infoReservation/InfoReservation";
import ListContactedNoAnswer from "./ListContactedNoAnswer";
import ListGamesNotReceived from "./ListGameNotReceived";
import ListGamesNotPlaced from "./ListGamesNotPlaced";
import ProgressionPeopleContacted from "./ProgressionPeopleContacted";
import ProgressionGamesReceived from "./ProgressionGamesReceived";
import ProgressionGamesNotPlaced from "./ProgressionGamesNotPlaced";

const Home = () => {

    return (
        <div>
            <InfoReservation/>

            <ListGamesNotReceived/>

            <ListGamesNotPlaced/>

            <ListContactedNoAnswer/>

            <ProgressionPeopleContacted/>

            <ProgressionGamesReceived/>

            <ProgressionGamesNotPlaced/>

        </div>

    )
}

export default Home;
