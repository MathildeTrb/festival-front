import useAxios from "../../utils/useAxios";
import {Company} from "../../utils/types";
import {Form} from "react-bootstrap";
import {FC} from "react";

const CompanySelectList: FC<{ selected: Company, handleChange: (set: any) => void }> = ({selected, handleChange}) => {

    const {data: companies} = useAxios<Company[]>("companies");
    return (
        <div>
            {companies &&
            <Form.Control as="select" defaultValue={selected ? JSON.stringify(selected) : 0} onChange={handleChange}>
                <option value={0} disabled className="option-disabled">Choisir une entreprise</option>
                {companies.map((company, index) => <option key={index} value={JSON.stringify(company)}>{company.name}</option>)}
            </Form.Control>
            }
        </div>
    )
}

export default CompanySelectList;
