import useFetch from "../utils/useFetch";
import Games from "./Games";

const GamesList = () => {

    const {data: games, isPending, error} = useFetch("http://localhost:8000/games")

    return (
        <div className="gameList">

            <h2>La liste de tous nos jeux</h2>
            {error && <div>{ error }</div>}
            {isPending && <div>Loading...</div>}
            {games && <Games games={games}/>}
        </div>
    );
}

export default GamesList;
