import useAxios from "../../utils/useAxios";
import {Form} from "react-bootstrap";
import {FC} from "react";
import {GameType} from "../../utils/types";

const GameTypeSelectList: FC<{selected: number}> = ({selected}) => {

    const {data: gameTypes} = useAxios<GameType[]>("gameTypes");

    return (
        <div>
            {gameTypes &&
            <Form.Control as="select" defaultValue={selected}>
                {gameTypes.map((gameType, index) => <option key={index} value={gameType.id}>{gameType.label}</option>)}
            </Form.Control>
            }
        </div>
    )
}

export default GameTypeSelectList;
