import {FC, useContext} from "react";
import {Row, Col, Image} from "react-bootstrap"
import AreaList from "../area/AreaList";
import {FestivalContext} from "../../App";

const HomeVisitor: FC = () => {

    const {selectedFestival} = useContext(FestivalContext)

    return (
        <div className="text-center m-auto">
            <Row className="mt-4">
                <Col>
                    <div>
                        <Image fluid width={400} height={400} src={selectedFestival.imageUrl} alt="Photo"/>
                    </div>
                    <div className="mt-5">
                        {selectedFestival.description}
                    </div>
                </Col>
                <Col>
                    <h2 className="mb-5">Liste des zones</h2>
                    <AreaList/>
                </Col>
            </Row>
        </div>
    )
}

export default HomeVisitor;
