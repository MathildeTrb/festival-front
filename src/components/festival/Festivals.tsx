import {createContext, Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import useAxios from "../../utils/useAxios";
import {Festival} from "../../utils/types";
import {Col, Spinner} from "react-bootstrap";
import FestivalRow from "./FestivalRow";
import {VscDiffAdded} from "react-icons/vsc";
import ModalHandleFestival from "./ModalHandleFestival";

type FestivalContextProps = {
    festivals: Festival[];
    setFestivals: Dispatch<SetStateAction<Festival[]>>;
}

export const FestivalContext = createContext<FestivalContextProps>({} as FestivalContextProps);

const Festivals: FC = () => {

    const {data: festivals, isPending, setData: setFestivals} = useAxios<Festival[]>("festivals");

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);

    useEffect(() =>{
        document.title = "Liste des festivals"
    })

    const value = {festivals, setFestivals};

    const onChange = (newFestival : Festival) => {
        setFestivals([...festivals, newFestival])
    }

    return (
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {festivals &&
            <FestivalContext.Provider value={value}>
                <h1 className="text-center mb-5">
                    Liste des festivals
                </h1>

                <button type="button" className="mon-button mb-2" onClick={() => setShowModalCreate(true)}><p>
                    <VscDiffAdded/> Ajout d'un festival</p></button>
                <ModalHandleFestival title={"ajout d'un festival"} show={showModalCreate} onHide={() => setShowModalCreate(false)} onChange={onChange}/>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Photo</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Description</th>
                        <th scope="col">Courant</th>
                        <th scope="col">Date de création</th>
                        <th scope="col">Espaces</th>
                        <th scope="col">Zones</th>
                        <th scope="col">Modifier Festival</th>
                    </tr>
                    </thead>
                    <tbody>
                    {festivals
                        .sort((f1, f2) => new Date(f1.creationDate).getTime() - new Date(f2.creationDate).getTime())
                        .map((festival, index) => <FestivalRow key={index} festival={festival}/>)}
                    </tbody>
                </table>
            </FestivalContext.Provider>
            }
        </div>
    )
}

export default Festivals;
