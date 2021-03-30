import {makeStyles} from "@material-ui/core/styles";
import React, {createContext, FC, useContext} from "react";
import useAxios from "../../utils/useAxios";
import {Festival, GameMonitoring} from "../../utils/types";
import {FestivalContext} from "../../App";
import {Card, ListGroup, Spinner} from "react-bootstrap";


type GamesNotPlacedProps = {
    GamesNotPlacedTab;
    setGamesNotPlacedTab: (festivals?: Festival[]) => void
}

export const GameMonitoringContext = createContext<GamesNotPlacedProps>({} as GamesNotPlacedProps)

const ListGamesNotPlaced: FC = () =>{

    const useStyles = makeStyles((theme) => ({
        root:{
            width:'100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }))
    const {selectedFestival} = useContext(FestivalContext);

    const {data: GamesNotPlacedTab, isPending, setData :setGamesNotPlacedTab} = useAxios<Festival>(`festivals/${selectedFestival.id}/GamesNotPlaced`)

    const classes = useStyles();

    return(
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {GamesNotPlacedTab &&
            <Card style={{width: '18rem', marginTop:'2rem'}}>
                <h4>Liste jeu(x) non placé(s)</h4>
                {console.log(GamesNotPlacedTab)}
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
