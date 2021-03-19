import useAxios from "../../utils/useAxios";
import {Form} from "react-bootstrap";
import {FC} from "react";
import {GameType} from "../../utils/types";

const GameTypeSelectList: FC<{selected: GameType, handleChange: (set: any) => void}> = ({selected, handleChange}) => {

    const {data: gameTypes} = useAxios<GameType[]>("gameTypes");

    return (
        <div>
            {gameTypes &&
            <Form.Control as="select" onChange={handleChange} defaultValue={JSON.stringify(selected)}>
                {gameTypes.map((gameType, index) => <option key={index} value={JSON.stringify(gameType)}>{gameType.label}</option>)}
            </Form.Control>
            }
        </div>
    )
}

export default GameTypeSelectList;
