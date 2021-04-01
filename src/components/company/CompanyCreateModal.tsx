import {FC, useContext} from "react";
import {Modal} from "react-bootstrap";
import CompanyForm from "./CompanyForm";
import {Company} from "../../utils/types";
import {CompanyContext} from "./Companies";

const CompanyCreateModal: FC<{show: boolean, onHide: () => void}> = ({show, onHide}) => {

    const {companies, setCompanies} = useContext(CompanyContext);

    const handleCreate = (company: Company) => {

        company.contacts = [];
        company.games = [];

        const newCompanies = [...companies, company];
        newCompanies.sort((c1, c2) => c1.name.localeCompare(c2.name));

        setCompanies(newCompanies);

        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Création d'une entreprise
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CompanyForm onAction={handleCreate}/>
            </Modal.Body>
        </Modal>
    )
}

export default CompanyCreateModal;
