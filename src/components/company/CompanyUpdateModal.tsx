import {FC, useContext} from "react";
import {Modal} from "react-bootstrap";
import {CompanyContext} from "./Companies";
import {Company} from "../../utils/types";
import CompanyForm from "./CompanyForm";

const CompanyUpdateModal: FC<{show: boolean, company: Company, onHide: () => void}> = ({show, company, onHide}) => {

    const {companies, setCompanies} = useContext(CompanyContext);

    const handleUpdate = (updatedCompany: Company) => {

        const updatedCompanies: Company[] = [...companies];

        const index = updatedCompanies.findIndex(c => c.id === updatedCompany.id);

        updatedCompanies[index] = updatedCompany;

        setCompanies(updatedCompanies);

        onHide();
    }

    return (
        <Modal show={show} size="xl" onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title>
                    {company.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CompanyForm company={company} onAction={handleUpdate} updateMode/>
            </Modal.Body>
        </Modal>
    )
}

export default CompanyUpdateModal;
