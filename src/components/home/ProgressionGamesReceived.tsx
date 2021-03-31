import {useContext} from "react";
import {FestivalContext} from "../../App";
import useAxios from "../../utils/useAxios";
import { Game, GameMonitoring} from "../../utils/types";
import {ProgressBar, Spinner} from "react-bootstrap";

const ProgressionGamesReceived = () => {
    const {selectedFestival} = useContext(FestivalContext);

    const {data: gamesNotReceived, isPending, setData: setGamesNotReceived} = useAxios<GameMonitoring[]>(`gameMonitorings/${selectedFestival.id}/gamesNotReceived`)
    const {data: allGames, isPending: isPendingBis} = useAxios<Game[]>(`games/${selectedFestival.id}/allGames`)

    return(
        <>
            {isPendingBis || isPending && <Spinner animation="border" variant="primary"/>}
            {gamesNotReceived && allGames &&
                <div>
                    <h5>Progression jeu(x) reçu(s)</h5>
                    <ProgressBar now={((allGames.length - gamesNotReceived.length)/allGames.length)*100}/>
                </div>
            }

        </>
    )
}
export default ProgressionGamesReceived;
