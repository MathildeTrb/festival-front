import InfoReservation from "../infoReservation/InfoReservation";
import ListContactedNoAnswer from "./listContactedNoAnswer";
import ListGamesNotReceived from "./listGameNotReceived";
import ListGamesNotPlaced from "./listGamesNotPlaced";
import ProgressionPeopleContacted from "./progressionPeopleContacted";
import ProgressionGamesReceived from "./progressionGamesReceived";
import ProgressionGamesNotPlaced from "./progressionGamesNotPlaced";
const Home = () => {

    return (
        <div>

            <ListGamesNotReceived/>

            <ListGamesNotPlaced/>

            <ListContactedNoAnswer/>

            <ProgressionPeopleContacted/>

            <ProgressionGamesReceived/>

            <ProgressionGamesNotPlaced></ProgressionGamesNotPlaced>

        </div>

    )
}

export default Home;
