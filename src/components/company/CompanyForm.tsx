import {FC, useState} from "react";
import {Company} from "../../utils/types";
import {Button, Col, Form, Row} from "react-bootstrap";

const CompanyForm: FC<{company?: Company, onCreate: (c: Company) => void, updateMode?: boolean}> = ({company, onCreate, updateMode}) => {

    const [name, setName] = useState<string>(company ? company.name : null);
    const [mail, setMail] = useState<string>(company ? company.mail : null);
    const [address, setAddress] = useState<string>(company ? company.address : null);
    const [canBeExhibitor, setCanBeExhibitor] = useState<boolean>(false);

    const handleChange = set => event => {
        set(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault();

        console.log("CREATE company")
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
                    <Button variant={canBeExhibitor ? "success" : "danger"} onClick={() => setCanBeExhibitor(!canBeExhibitor)}>{canBeExhibitor ? "Oui" : "Non"}</Button>
                </Col>
            </Form.Group>

            <div className="text-center">
                <button className="mon-button" type="submit">Valider</button>
            </div>
        </Form>
    )
}

export default CompanyForm;
