import {createContext, FC, useState} from "react";
import {ExhibitorMonitoring, GameMonitoring, Reservation} from "../../../utils/types";
import {Button, Container} from "react-bootstrap";
import ExhibitorGameMonitoringRow from "./ExhibitorGameMonitoringRow";
import axios from "../../../utils/axios";
import GameMonitoringCreateModal from "../../gameMonitoring/GameMonitoringCreateModal";
import {VscDiffAdded} from "react-icons/vsc";

type ExhibitorMonitoringContextProps = {
    exhibitorMonitoring: ExhibitorMonitoring
}

export const ExhibitorMonitoringContext = createContext<ExhibitorMonitoringContextProps>({} as ExhibitorMonitoringContextProps);

const ExhibitorGameMonitorings: FC<{ exhibitorMonitoring: ExhibitorMonitoring}> = ({exhibitorMonitoring}) => {

    const [gameMonitorings, setGameMonitorings] = useState<GameMonitoring[]>( exhibitorMonitoring.reservation !== null ? (exhibitorMonitoring.reservation.gameMonitorings[0].game ? exhibitorMonitoring.reservation.gameMonitorings : []) : []);

    console.log("gameMonitorings", gameMonitorings)

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);

    const handleDelete = (gameMonitoringToDelete: GameMonitoring) => {

        axios.delete(`gameMonitorings/${gameMonitoringToDelete.reservation.id}/${gameMonitoringToDelete.game.id}`)
            .then(() => {
                const updatedGameMonitorings: GameMonitoring[] = [...gameMonitorings];

                const index = updatedGameMonitorings.findIndex(gameMonitoring => gameMonitoring.reservation.id === gameMonitoringToDelete.reservation.id && gameMonitoring.game.id === gameMonitoringToDelete.game.id);

                delete updatedGameMonitorings[index];

                setGameMonitorings(updatedGameMonitorings);
            })
    }

    const handleCreate = (newGameMonitoring: GameMonitoring) => {
        setGameMonitorings(prevState => [...prevState, newGameMonitoring]);
    }

    const value = {exhibitorMonitoring};

    return (
        <>


                <ExhibitorMonitoringContext.Provider value={value}>
                    <Container fluid>
                        <div className="text-center mb-4">
                            <h3>Liste des jeux de la réservation</h3>
                            <button type="button" className="mon-delete-button" onClick={() => setShowModalCreate(true)}><p><VscDiffAdded/>Ajout d'un suivi de jeu</p></button>
                            <GameMonitoringCreateModal show={showModalCreate} onHide={() => setShowModalCreate(false)} onCreate={handleCreate} />
                        </div>

                        {!exhibitorMonitoring.reservation && <div>Pas de game monitorings</div>}
                        {exhibitorMonitoring.reservation && gameMonitorings &&
                        <table className="table table-hover table-bordered">
                            <thead className="thead-blue">
                            <tr className="text-center">
                                <th scope="col">Nom</th>
                                <th scope="col">
                                    <div className="text-center">Quantités</div>
                                    <div>(expo | tombola | don)</div>
                                </th>
                                <th scope="col">Statut</th>
                                <th scope="col">Zone</th>
                                <th scope="col">Placé</th>
                                <th scope="col">Retourné</th>
                                <th scope="col">Date de modication</th>
                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                gameMonitorings
                                    .sort((gm1, gm2) => gm1.game.name.localeCompare(gm2.game.name))
                                    .map((gameMonitoring, index) => {
                                        gameMonitoring.reservation = {} as Reservation;

                                        gameMonitoring.reservation.id = exhibitorMonitoring.reservation.id;

                                        return <ExhibitorGameMonitoringRow key={index} gameMonitoring={gameMonitoring}
                                                                           onDelete={() => handleDelete(gameMonitoring)}/>
                                    })
                            }
                            </tbody>
                        </table>
                        }
                    </Container>
                </ExhibitorMonitoringContext.Provider>
        </>


    )
}

export default ExhibitorGameMonitorings;
