import {FC, useEffect, useState} from "react";
import {Space} from "../../utils/types";
import {Row} from "react-bootstrap";
import SpaceForm from "./SpaceForm";

type SpacesFormProps = {
    isSubmitted: boolean;
    createFestival: (spaces: Space[]) => void;
}

const SpacesForm: FC<SpacesFormProps> = ({isSubmitted, createFestival}) => {

    const [space1, setSpace1] = useState<Space>()
    const [space2, setSpace2] = useState<Space>()
    const [space3, setSpace3] = useState<Space>()

    useEffect(() => {
        if (space1 && space2 && space3){
            const spaces : Space[] = [space1, space2, space3]
            createFestival(spaces)
        }
    }, [space1, space2, space3])

    return (
        <div>
            <Row>
                <SpaceForm onSubmit={setSpace1} isSubmitted={isSubmitted} />
            </Row>
            <Row>
                <SpaceForm onSubmit={setSpace2} isSubmitted={isSubmitted} />
            </Row>
            <Row>
                <SpaceForm onSubmit={setSpace3} isSubmitted={isSubmitted} />
            </Row>
        </div>
    )
}

export default SpacesForm
