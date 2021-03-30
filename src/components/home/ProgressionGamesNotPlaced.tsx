import useAxios from "../../utils/useAxios";
import {Game} from "../../utils/types";
import {useContext} from "react";
import {FestivalContext} from "../../App";
import {ProgressBar, Spinner} from "react-bootstrap";

const ProgressionGamesNotPlaced = () => {

    const {selectedFestival} = useContext(FestivalContext);
    const {data: gamesNotPlaced, isPending } = useAxios<Game[]>(`games/${selectedFestival.id}/GamesNotPlaced`)
    const {data: allGames, isPending: isPendingBis} = useAxios<Game[]>(`games/${selectedFestival.id}/allGames`)

    return(
        <>
            {isPendingBis || isPending &&<Spinner animation="border" variant="primary"/>}
            {gamesNotPlaced && allGames &&
            <div>
                <h5>Progression jeu(x) placé(s)</h5>
                {console.log(gamesNotPlaced.length)}
                <ProgressBar now={((allGames.length - gamesNotPlaced.length)/allGames.length)*100}/>
            </div>
            }
        </>
    )

}
export default ProgressionGamesNotPlaced;
