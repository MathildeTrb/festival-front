import {FC} from "react";
import {GameMonitoringStatus} from "../../utils/types";
import useAxios from "../../utils/useAxios";
import {Form} from "react-bootstrap";

const GameMonitoringStatusSelectList: FC<{selected?: GameMonitoringStatus, handleChange: (set: any) => void}> = ({selected, handleChange}) => {

    const {data: gameMonitoringStatusTab} = useAxios<GameMonitoringStatus[]>("gameMonitoringStatus");

    return (
        <>
            {gameMonitoringStatusTab &&
            <Form.Control as="select" defaultValue={selected ? JSON.stringify(selected) : 0} onChange={handleChange}>
                <option value={0} disabled className="option-disabled">Choisir un status</option>
                {gameMonitoringStatusTab.map((gameMonitoringStatus, index) => <option key={index} value={JSON.stringify(gameMonitoringStatus)}>{gameMonitoringStatus.label}</option>)}
            </Form.Control>
            }
        </>
    )
}

export default GameMonitoringStatusSelectList;
