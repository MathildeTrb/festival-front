import React, {createContext, FC, useContext} from "react";
import useAxios from "../../utils/useAxios";
import { ExhibitorMonitoring} from "../../utils/types";
import {FestivalContext} from "../../App";
import {Button, Card, ListGroup, Spinner} from "react-bootstrap";

type PeopleContactedNoAnswerProps = {
    peopleContactedNoAnswerTab: ExhibitorMonitoring[];
    setPeopleContactedNoAnswerTab: (exhibitorMonitorings?: ExhibitorMonitoring[]) => void
}

export const ExhibitorMonitoringContext = createContext<PeopleContactedNoAnswerProps>({} as PeopleContactedNoAnswerProps)

const ListContactedNoAnswer: FC = () =>{

    const {selectedFestival} = useContext(FestivalContext);

    const {data: peopleContactedNoAnswerTab, isPending, setData :setPeopleContactedNoAnswerTab} = useAxios<ExhibitorMonitoring[]>(`/exhibitorMonitorings/festival/${selectedFestival.id}/peopleContactedNoAnswer`)

    const value = {peopleContactedNoAnswerTab, setPeopleContactedNoAnswerTab}

    return(
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {peopleContactedNoAnswerTab &&
            <Card style={{width: '18rem', marginTop:'2rem'}}>
                <h4>Exposant(s) contacté(s) mais sans réponse</h4>
                <ExhibitorMonitoringContext.Provider value={value}>
                    <ListGroup variant="flush">
                        {peopleContactedNoAnswerTab.map((peopleContactedNoAnswer, index) => {
                            return (
                                <ListGroup.Item>{peopleContactedNoAnswer.exhibitor.name}</ListGroup.Item>
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
