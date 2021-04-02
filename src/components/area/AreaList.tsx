import {FC, useContext} from "react";
import {AreaVisitor} from "../../utils/types";
import {Accordion, Spinner} from "react-bootstrap";
import {FestivalContext} from "../../App";
import useAxios from "../../utils/useAxios";
import AreaCard from "./AreaCard";

const AreaList: FC = () => {

    const {selectedFestival} = useContext(FestivalContext);

    const {data: areas, isPending} = useAxios<AreaVisitor[]>(`areas/${selectedFestival.id}/games`)

    return (
        <div>
            {isPending && <Spinner animation="border" variant="primary"/>}
            {areas && areas.length === 0 && <div>Aucune zone à afficher</div>}
            {areas && areas.length > 0 &&
            <Accordion>
                {areas.map((area, index) => <AreaCard key={index} area={area}/>)}
            </Accordion>
            }
        </div>
    )
}

export default AreaList;
