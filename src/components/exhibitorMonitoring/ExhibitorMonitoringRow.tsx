import {FC} from "react";
import {ExhibitorMonitoring} from "../../utils/types";

const ExhibitorMonitoringRow: FC<{ exhibitorMonitoring: ExhibitorMonitoring }> = ({exhibitorMonitoring}) => {

    return (

        <tr>
            <td>{exhibitorMonitoring.exhibitor.name}</td>
            <td>{exhibitorMonitoring.dateContact1}</td>
            <td>{exhibitorMonitoring.dateContact2}</td>
            <td>{exhibitorMonitoring.dateContact3}</td>
            <td>{exhibitorMonitoring.status.label}</td>
            <td>{exhibitorMonitoring.reservation ? exhibitorMonitoring.reservation.id : "pas de résa"}</td>
        </tr>

    )
}

export default ExhibitorMonitoringRow;
