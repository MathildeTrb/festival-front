import {FC, useContext} from "react";
import {Area} from "../../utils/types";
import useAxios from "../../utils/useAxios";
import {Form} from "react-bootstrap";
import {FestivalContext} from "../../App";

const AreaSelectList: FC<{selected?: Area, handleChange: (set:any) => void}> = ({selected, handleChange}) => {
    const {selectedFestival} = useContext(FestivalContext);
    const {data: areaTab} = useAxios<Area[]>(`areas/${selectedFestival.id}`)
    return(
        <>
            {console.log(areaTab)}
            {areaTab &&
            <Form.Control as="select" defaultValue={selected ? JSON.stringify(selected) : 0} onChange={handleChange}>
                <option value={0} disabled className="option-disabled">Choisir une zone</option>
                {areaTab.map((area, index)=>  <option key={index} value={JSON.stringify(area)}>{area.label}</option>)}
            </Form.Control>
            }
        </>
    )
}
export default AreaSelectList;
