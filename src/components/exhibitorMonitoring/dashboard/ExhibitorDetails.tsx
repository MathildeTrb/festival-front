import {FC} from "react";
import {ExhibitorMonitoring} from "../../../utils/types";

const ExhibitorDetails: FC<{exhibitorMonitoring: ExhibitorMonitoring}> = ({exhibitorMonitoring}) => {
    return (
        <div>
            {exhibitorMonitoring.comment}
        </div>
    )
}

export default ExhibitorDetails;
