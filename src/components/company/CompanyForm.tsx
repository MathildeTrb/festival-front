import {FC, useState} from "react";
import {Company} from "../../utils/types";
import {Button, Col, Form, Row} from "react-bootstrap";
import axios from "../../utils/axios";

const CompanyForm: FC<{company?: Company, onAction: (c: Company) => void, updateMode?: boolean}> = ({company, onAction, updateMode}) => {

    const [name, setName] = useState<string>(company ? company.name : "");
    const [mail, setMail] = useState<string>(company ? company.mail : "");
    const [address, setAddress] = useState<string>(company ? company.address : "");
    const [canBeExhibitor, setCanBeExhibitor] = useState<boolean>(company && company.canBeExhibitor);

    const handleChange = set => event => {
        set(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault();

        const newCompany: Company = {
            id: company ? company.id : undefined,
            name,
            mail,
            address,
            canBeExhibitor,
            contacts: company ? company.contacts : undefined,
            games: company ? company.games : undefined
        }

        const action = updateMode ? axios.put : axios.post;

        action("companies", {
            company: newCompany
        })
            .then(({data}) => {
                onAction(updateMode ? newCompany : data);
            })
            .catch(err => console.log(err.message))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Nom
                </Form.Label>
                <Col sm="9">
                    <Form.Control type="text" value={name} onChange={handleChange(setName)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Mail
                </Form.Label>
                <Col sm="9">
                    <Form.Control type="text" value={mail} onChange={handleChange(setMail)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Adresse
                </Form.Label>
                <Col sm="9">
                    <Form.Control type="text" value={address} onChange={handleChange(setAddress)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="3">
                    Exposant potentiel
                </Form.Label>
                <Col sm="9">
                    <button type="button" className={canBeExhibitor ? "mon-validate-button" : "mon-delete-button"} onClick={() => setCanBeExhibitor(!canBeExhibitor)}>{canBeExhibitor ? "Oui" : "Non"}</button>
                </Col>
            </Form.Group>

            <div className="text-center">
                <button className="mon-button" type="submit">Valider</button>
            </div>
        </Form>
    )
}

export default CompanyForm;
