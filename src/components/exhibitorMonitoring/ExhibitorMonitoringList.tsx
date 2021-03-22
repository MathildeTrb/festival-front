import useAxios from "../../utils/useAxios";
import {ExhibitorMonitoring, Game} from "../../utils/types";
import {createContext, FC, useContext} from "react";
import {FestivalContext} from "../../App";
import {Spinner} from "react-bootstrap";
import ExhibitorMonitoringRow from "./ExhibitorMonitoringRow";

const ExhibitorMonitoringList: FC = () => {

    const {selectedFestival} = useContext(FestivalContext);
    const {
        data: exhibitorMonitorings,
        isPending
    } = useAxios<ExhibitorMonitoring[]>("exhibitorMonitorings/" + selectedFestival.id)

    return (
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {exhibitorMonitorings &&
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
                {exhibitorMonitorings.map(
                    (exhibitorMonitoring, index) =>
                        <ExhibitorMonitoringRow exhibitorMonitoring={exhibitorMonitoring}/>
                )
                }
                </tbody>
            </table>

            }
        </div>
    )

}

export default ExhibitorMonitoringList;
