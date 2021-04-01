import {Company} from "../../utils/types";
import {FC, useContext} from "react";
import {FestivalContext} from "../../App";
import useAxios from "../../utils/useAxios";
import {Form} from "react-bootstrap";

const CompanySelectList: FC<{selected?: Company, handleChange: (set:any) => void}> = ({selected, handleChange}) => {

    const {selectedFestival} = useContext(FestivalContext);
    const {data: companyTab} = useAxios<Company[]>(`festival/${selectedFestival.id}/exhibitorsNotInFestival`)

    return(
        <>
            {console.log(companyTab)}
            {
                companyTab &&
                    <Form.Control as="select" defaultValue={selected ? JSON.stringify(selected) : 0} onChange={handleChange}>
                        <option value={0} disabled className="option-disabled">Choisir un exposant</option>
                        {companyTab.map((company, index) => <option key={index} value={JSON.stringify(company)}>{company.name}</option>)}
                    </Form.Control>
            }
        </>
    )
}
export default CompanySelectList;
