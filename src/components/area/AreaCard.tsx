import {FC} from "react";
import {Accordion, Card} from "react-bootstrap";
import {AreaVisitor} from "../../utils/types";
import GameTableVisitor from "./GameTableVisitor";

const AreaCard: FC<{ area: AreaVisitor }> = ({area}) => (
    <Card>
        <Card.Header>
            <Accordion.Toggle as="button" className="mon-button" eventKey={String(area.id)}>
                {area.label}
            </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={String(area.id)}>
            <Card.Body>
                <GameTableVisitor games={area.games}/>
            </Card.Body>
        </Accordion.Collapse>
    </Card>
)

export default AreaCard;
