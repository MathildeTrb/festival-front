import useAxios from "../../utils/useAxios";
import {Form} from "react-bootstrap";
import {FC} from "react";
import {GameType} from "../../utils/types";

const GameTypeSelectList: FC<{ selected?: GameType, handleChange: (set: any) => void}> = ({selected, handleChange}) => {

    const {data: gameTypes} = useAxios<GameType[]>("gameTypes");

    return (
        <>
            {gameTypes &&
            <Form.Control as="select" defaultValue={selected ? JSON.stringify(selected) : 0} onChange={handleChange}>
                <option value={0} disabled className="option-disabled">Choisir un type</option>
                {gameTypes.map((gameType, index) => <option key={index} value={JSON.stringify(gameType)}>{gameType.label}</option>)}
            </Form.Control>
            }
        </>
    )
}

export default GameTypeSelectList;
