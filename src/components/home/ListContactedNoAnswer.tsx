import React, {createContext, FC, useContext} from "react";
import useAxios from "../../utils/useAxios";
import { ExhibitorMonitoring} from "../../utils/types";
import {FestivalContext} from "../../App";
import {Button, Card, ListGroup, Spinner} from "react-bootstrap";

type exhibitorMonitoringProps = {
    exhibitorMonitoringTab: ExhibitorMonitoring[];
    setexhibitorMonitoringTab: (exhibitorMonitorings?: ExhibitorMonitoring[]) => void
}

export const ExhibitorMonitoringContext = createContext<exhibitorMonitoringProps>({} as exhibitorMonitoringProps)

const ListContactedNoAnswer: FC = () =>{

    const {selectedFestival} = useContext(FestivalContext);

    const {data: exhibitorMonitoringTab, isPending, setData :setexhibitorMonitoringTab} = useAxios<ExhibitorMonitoring[]>(`/exhibitorMonitorings/festival/${selectedFestival.id}/exhibitorMonitoring`)

    const value = {exhibitorMonitoringTab, setexhibitorMonitoringTab}

    return(
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {exhibitorMonitoringTab &&
            <Card style={{width: '20rem', marginTop:'2rem'}}>
                <h4>Exposant(s) contacté(s) mais sans réponse</h4>
                <ExhibitorMonitoringContext.Provider value={value}>
                    <ListGroup variant="flush">
                        {exhibitorMonitoringTab.map((exhibitorMonitoring, index) => {
                            return (
                                <ListGroup.Item>{exhibitorMonitoring.exhibitor.name}</ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </ExhibitorMonitoringContext.Provider>
            </Card>
            }
        </div>
    )
}
export default ListContactedNoAnswer;
