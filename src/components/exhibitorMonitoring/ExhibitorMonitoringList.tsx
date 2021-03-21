import useAxios from "../../utils/useAxios";
import {ExhibitorMonitoring, Game} from "../../utils/types";
import {createContext, FC, useContext} from "react";
import {FestivalContext} from "../../App";
import {Spinner} from "react-bootstrap";
import {GiClick} from "react-icons/all";
import GameRow from "../game/GameRow";
import {GameContext} from "../game/Games";
import ExhibitorMonitoringRow from "./ExhibitorMonitoringRow";

type ExhibitorMonitoringContextProps = {
    exhibitorMonitorings: ExhibitorMonitoring[];
    setExhibitorMonitorings: (exhibitorMonitorings?: ExhibitorMonitoring[]) => void;
}

export const ExhibitorMonitoringContext = createContext<ExhibitorMonitoringContextProps>({} as ExhibitorMonitoringContextProps);

const ExhibitorMonitoringList: FC = () => {

    const {selectedFestival} = useContext(FestivalContext);
    const {data: exhibitorMonitorings, setData: setExhibitorMonitorings, isPending} = useAxios<ExhibitorMonitoring[]>("exhibitorMonitorings/" + selectedFestival.id)

    const value = {exhibitorMonitorings, setExhibitorMonitorings}

    console.log("EXHIBITOR MONITORING list")
    console.log(selectedFestival)
    console.log(exhibitorMonitorings)

    return (
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {exhibitorMonitorings &&
            <ExhibitorMonitoringContext.Provider value={value}>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Exposant</th>
                        <th scope="col">1er contact</th>
                        <th scope="col">2eme contact</th>
                        <th scope="col">3eme contact</th>
                        <th scope="col">Statue</th>
                        <th scope="col">Réservation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {exhibitorMonitorings.map((exhibitorMonitoring, index) => <ExhibitorMonitoringRow exhibitorMonitoring={exhibitorMonitoring}/>)}
                    </tbody>
                </table>
            </ExhibitorMonitoringContext.Provider>

            }
        </div>
    )

}

export default ExhibitorMonitoringList
