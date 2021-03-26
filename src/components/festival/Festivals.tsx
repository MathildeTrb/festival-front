import {createContext, Dispatch, FC, SetStateAction, useEffect} from "react";
import useAxios from "../../utils/useAxios";
import {Festival} from "../../utils/types";
import {Spinner} from "react-bootstrap";
import FestivalRow from "./FestivalRow";

type FestivalContextProps = {
    festivals: Festival[];
    setFestivals: Dispatch<SetStateAction<Festival[]>>;
}

export const FestivalContext = createContext<FestivalContextProps>({} as FestivalContextProps);

const Festivals: FC = () => {

    const {data: festivals, isPending, setData: setFestivals} = useAxios<Festival[]>("festivals");

    useEffect(() =>{
        document.title = "Liste des festivals"
    })

    const value = {festivals, setFestivals};

    return (
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {festivals &&
            <FestivalContext.Provider value={value}>
                <h1 className="text-center mb-5">
                    Liste des festivals
                </h1>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Photo</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Description</th>
                        <th scope="col">Courant</th>
                        <th scope="col">Date de création</th>
                        <th scope="col">Espaces</th>
                        <th scope="col">Zones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {festivals.map((festival, index) => <FestivalRow key={index} festival={festival}/>)}
                    </tbody>
                </table>
            </FestivalContext.Provider>
            }
        </div>
    )
}

export default Festivals;
