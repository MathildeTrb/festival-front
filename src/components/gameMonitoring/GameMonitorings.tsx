import {GameMonitoring} from "../../utils/types";
import {createContext, FC, useContext, useEffect} from "react";
import useAxios from "../../utils/useAxios";
import {Spinner} from "react-bootstrap";
import GameMonitoringRow from "./GameMonitoringRow";
import {FestivalContext} from "../../App";

type GameMonitoringsContextProps = {
    gameMonitorings: GameMonitoring[];
    setGameMonitorings: (gameMonitorings?: GameMonitoring[]) => void;
}

export const GameMonitoringContext = createContext<GameMonitoringsContextProps>({} as GameMonitoringsContextProps)


const GameMonitorings: FC = ()=> {

    //const {data: gameMonitorings, isPending, setData: setGameMonitorings} = useAxios<GameMonitoring[]>("gameMonitorings")

    const {selectedFestival} = useContext(FestivalContext);

    const {
        data: gameMonitorings,
        isPending,
        setData: setGameMonitorings
    } = useAxios<GameMonitoring[]>(`gameMonitorings/${selectedFestival.id}`)

    useEffect(() => {
        document.title = "Suivi des jeux"
    },[gameMonitorings])

    const value = {gameMonitorings, setGameMonitorings}

    return (
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {gameMonitorings &&
            <GameMonitoringContext.Provider value={value}>
                <h1 className="text-center mb-5">
                    Suivi des jeux du festival
                </h1>

                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Jeux</th>
                        <th scope="col">Statut</th>
                        <th scope="col">Placé</th>
                        <th scope="col">Zone</th>
                        <th scope="col">Qté exposée</th>
                        <th scope="col">Qté tombola</th>
                        <th scope="col">Qté donnée</th>
                        <th scope="col">besoin d'être retourné</th>
                        <th scope="col">Prix retour</th>
                        <th scope="col">Modification</th>

                    </tr>
                    </thead>
                    <tbody>
                    {gameMonitorings.map((gameMonitoring, index) => <GameMonitoringRow key={index}  gameMonitoring={gameMonitoring}/>)}
                    </tbody>

                </table>
            </GameMonitoringContext.Provider>
            }
        </div>
    )

}
export default GameMonitorings;
