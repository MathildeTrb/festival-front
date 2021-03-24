import {FC} from "react";
import {ExhibitorMonitoringStatus} from "../../utils/types";
import useAxios from "../../utils/useAxios";
import {Form} from "react-bootstrap";

const OldExhibitorMonitoringStatusSelectList: FC<{selected?: ExhibitorMonitoringStatus, handleChange: (set: any) => void}> = ({selected, handleChange}) => {

    const {data: exhibitorMonitoringStatusTab} = useAxios<ExhibitorMonitoringStatus[]>("exhibitorMonitoringStatus");
    return (
        <>
            {exhibitorMonitoringStatusTab &&
            <Form.Control as="select" defaultValue={selected ? JSON.stringify(selected) : 0} onChange={handleChange}>
                <option value={0} disabled className="option-disabled">Choisir un status</option>
                {exhibitorMonitoringStatusTab.map((exhibitorMonitoringStatus, index) => <option key={index} value={JSON.stringify(exhibitorMonitoringStatus)}>{exhibitorMonitoringStatus.label}</option>)}
            </Form.Control>
            }
        </>
    )
}

export default OldExhibitorMonitoringStatusSelectList;
