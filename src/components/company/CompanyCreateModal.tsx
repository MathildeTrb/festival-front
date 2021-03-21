import {FC} from "react";
import {Modal} from "react-bootstrap";
import CompanyForm from "./CompanyForm";
import {Company} from "../../utils/types";

const CompanyCreateModal: FC<{show: boolean, onHide: () => void}> = ({show, onHide}) => {

    const handleCreate = (company: Company) => {

        console.log(company)

        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Création d'une entreprise
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CompanyForm onCreate={handleCreate}/>
            </Modal.Body>
        </Modal>
    )
}

export default CompanyCreateModal;
