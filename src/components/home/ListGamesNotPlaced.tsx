import React, {createContext, FC, useContext} from "react";
import useAxios from "../../utils/useAxios";
import {Festival} from "../../utils/types";
import {FestivalContext} from "../../App";
import {Card, ListGroup, Spinner} from "react-bootstrap";


type GamesNotPlacedProps = {
    GamesNotPlacedTab;
    setGamesNotPlacedTab: (festivals?: Festival[]) => void
}


const ListGamesNotPlaced: FC = () =>{

    const {selectedFestival} = useContext(FestivalContext);

    const {data: GamesNotPlacedTab, isPending} = useAxios<Festival>(`festivals/${selectedFestival.id}/GamesNotPlaced`)


    return(
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {GamesNotPlacedTab && GamesNotPlacedTab[0] &&
            <Card style={{width: '20rem', marginTop:'2rem'}}>
                <h4>Liste jeu(x) non placé(s)</h4>
                <ListGroup>
                    {GamesNotPlacedTab[0].areas.map((area, index) => {
                        return area.gameMonitorings.map((gameMonitoring, index) => {
                            return <ListGroup.Item>{gameMonitoring.game.name}</ListGroup.Item>
                        })
                    })
                    }
                </ListGroup>
            </Card>
            }
        </div>
    )
}
export default ListGamesNotPlaced;
