import {FC, useContext, useState} from "react";
import {Form, Modal, Row, Col, Alert} from "react-bootstrap";
import {FestivalContext} from "../../App";
import {Company, ExhibitorMonitoring} from "../../utils/types";
import useAxios from "../../utils/useAxios";
import {Hint} from "react-autocomplete-hint";
import {IHintOption} from "react-autocomplete-hint/dist/src/IHintOption";
import {useAxiosMethods} from "../../utils/axios-hooks";

const ExhibitorMonitoringCreateModal: FC<{show: boolean, onHide: () => void, onCreate: (em: ExhibitorMonitoring) => void}> = ({show, onHide, onCreate}) => {

    const {selectedFestival} = useContext(FestivalContext)

    const [comment, setComment] = useState<string>("");
    const [nameCompany, setNameCompany] = useState<string>("");

    const [showAlertCompany, setShowAlertCompany] = useState<boolean>(false);

    const {data: companies} = useAxios<Company[]>(`exhibitorMonitorings/festival/${selectedFestival.id}/exhibitorsNotInFestival`);

    const {post} = useAxiosMethods<ExhibitorMonitoring>("exhibitorMonitorings");

    const handleSubmit = event => {
        event.preventDefault();

        const company: Company = companies.find(c => c.name.toLowerCase() === nameCompany.toLowerCase());

        if (!company) {
            setShowAlertCompany(true)
        }
        else {

            post({
                company,
                festival: selectedFestival,
                comment
            }).then(data => {
                setComment("")
                setNameCompany("")
                onCreate(data);
                onHide();
            })
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>
                    Création d'un suivi d'exposant
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                    <Alert show={showAlertCompany} variant="warning" onClose={() => setShowAlertCompany(false)} dismissible>
                        <div className="text-center">
                            Entreprise inexistante
                        </div>
                    </Alert>

                    <Form.Group as={Row}>
                        <Form.Label column sm="1">
                            Exposant
                        </Form.Label>
                        <Col sm="5">
                            {companies &&
                            <Hint options={companies.map<IHintOption>(company => {
                                return {
                                    id: company.id,
                                    label: company.name
                                }
                            })}>
                                <input type="text" className="form-control" value={nameCompany} onChange={event => setNameCompany(event.target.value)}/>
                            </Hint>
                            }
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="1">
                            Commentaire
                        </Form.Label>
                        <Col sm="6">
                            <textarea className="form-control" rows={2} value={comment} onChange={event => setComment(event.target.value)}/>
                        </Col>
                    </Form.Group>

                    <div className="text-center">
                        <button className="mon-button" type="submit">Valider</button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ExhibitorMonitoringCreateModal;
