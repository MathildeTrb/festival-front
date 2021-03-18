import useAxios from "../utils/useAxios";
import {FC} from "react";
import {Spinner} from "react-bootstrap";
import GameTable from "./GameTable";

const Games: FC = () => {

    const {data: games, isPending, error} = useAxios("games");

    return (
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {error && <div>{error}</div>}
            {games && <GameTable games={games}/>}
        </div>
    )
}

export default Games;
