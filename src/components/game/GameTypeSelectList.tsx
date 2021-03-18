import useAxios from "../../utils/useAxios";
import {Form} from "react-bootstrap";
import {FC} from "react";
import {IGameType} from "../../utils/types";

const GameTypeSelectList: FC<{selected?: IGameType}> = ({selected}) => {

    const {data: gameTypes} = useAxios("gameTypes");

    return (
        <div>
            {gameTypes &&
            <Form.Control as="select">
                {gameTypes.map((gameType, index) => <option key={index} value={gameType} selected={selected ? selected.id === gameType.id : false}>{gameType.label}</option>)}
            </Form.Control>
            }
        </div>
    )
}

export default GameTypeSelectList;
