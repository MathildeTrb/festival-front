import useAxios from "../../utils/useAxios";
import {Company} from "../../utils/types";
import {Form} from "react-bootstrap";
import {FC} from "react";

const CompanySelectList: FC<{ selected: Company, handleChange: (set: any) => void }> = ({selected, handleChange}) => {

    const {data: companies} = useAxios<Company[]>("companies");
    return (
        <div>
            {companies &&
            <Form.Control as="select" onChange={handleChange} defaultValue={JSON.stringify(selected)}>
                {companies.map((company, index) => <option key={index} value={JSON.stringify(company)}>{company.name}</option>)}
            </Form.Control>
            }
        </div>
    )
}

export default CompanySelectList
