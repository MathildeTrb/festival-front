import React, {createContext, FC, useContext} from "react";
import useAxios from "../../utils/useAxios";
import {Festival, GameMonitoring} from "../../utils/types";
import {FestivalContext} from "../../App";
import {Card, ListGroup, Spinner} from "react-bootstrap";


type GamesNotReceivedProps = {
    GamesNotReceivedTab ;
    setGamesNotReceivedTab: (festivals?: Festival[]) => void
}

export const GameMonitoringContext = createContext<GamesNotReceivedProps>({} as GamesNotReceivedProps)

const ListGamesNotReceived: FC = () =>{

    const {selectedFestival} = useContext(FestivalContext);

    const {data: GamesNotReceivedTab, isPending, setData :setGamesNotReceivedTab} = useAxios<Festival>(`festivals/${selectedFestival.id}/GamesNotReceived`)

    return(
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {GamesNotReceivedTab &&
            <Card style={{width: '18rem', marginTop:'2rem'}}>
                <h4>Liste jeu(x) non reçu(s)</h4>
                <ListGroup>
                    {GamesNotReceivedTab[0].areas.map((area, index) => {
                            return area.gameMonitorings.map((gameMonitoring, index) => {
                                    return <ListGroup.Item>{gameMonitoring.game.name}</ListGroup.Item>
                                }
                            )
                        }
                    )
                    }
                </ListGroup>
            </Card>
            }
        </div>
    )
}
export default ListGamesNotReceived;
