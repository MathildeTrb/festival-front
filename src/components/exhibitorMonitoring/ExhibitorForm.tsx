import {Company, ExhibitorMonitoring} from "../../utils/types";
import {FC, useContext, useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import {FestivalContext} from "../../App";
import axios from "../../utils/axios";
import CalendarModal from "./CalendarModal";
import {Input} from "react-select/animated";
import CompanySelectList from "./CompanySelectList";

const ExhibitorForm: FC<{exhibitorMonitoring?: ExhibitorMonitoring, onAction: (c: ExhibitorMonitoring) => void, createMode?: boolean}> = ({exhibitorMonitoring, onAction, createMode}) => {
    const {selectedFestival} = useContext(FestivalContext);
    const [comment, setComment] = useState<string>("")
    const [company, setCompany] = useState<Company>()


    const handleChange = set => event => {
        set(event.target.value)
    }
    const handleSubmit = event => {
        event.preventDefault();

        const newExhibitorMonitoring: ExhibitorMonitoring = {
            exhibitor: exhibitorMonitoring.exhibitor,
            festival: selectedFestival,
            status: null,
            dateContact1 : null,
            dateContact2 : null,
            dateContact3 : null,
            comment: comment,
            reservation: null
        }

        const action = createMode ? axios.put : axios.post;

        action("exhibitorMonitorings", {
            exhibitorMonitoring: newExhibitorMonitoring
        })
            .then(({data}) => {
                onAction(createMode ? newExhibitorMonitoring : data);
            })
            .catch(err => console.log(err.message))
    }



    return(
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm="3">
                        Commentaire
                    </Form.Label>
                    <Col sm="9">
                        <input className="mon-input" type="text" value={comment} onChange={handleChange(setComment)}/>
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Form.Label column sm="3">
                        Choisir une entreprise
                    </Form.Label>
                    <Col>
                        <CompanySelectList handleChange={setCompany}></CompanySelectList>
                    </Col>
                </Form.Group>

            </Form>
        </>
    )
}
export default ExhibitorForm;
