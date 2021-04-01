import {FC, useContext, useState} from "react";
import {Col, Container, Modal, Row} from "react-bootstrap";
import {Festival, Space} from "../../utils/types";
import {BsPencilSquare} from "react-icons/bs";
import {useAxiosMethods} from "../../utils/axios-hooks";
import {FestivalContext} from "./Festivals";
import SpaceRow from "./SpaceRow";

const SpacesModal: FC<{ show: boolean, onHide: () => void, festival: Festival }> = ({show, onHide, festival}) => {

    const [label, setLabel] = useState<string>()
    const [tablePrice, setTablePrice] = useState<number>()
    const [meterPrice, setMeterPrice] = useState<number>()
    const [totalTableNumber, setTotalTableNumber] = useState<number>()

    const {festivals, setFestivals} = useContext(FestivalContext)

    const {post} = useAxiosMethods<Space>("spaces")

    const handleChange = set => event => {
        set(event.target.value)
    }

    const handleSubmit = async () => {

        const newSpace: Space = {
            festival: festival,
            label,
            meterPrice,
            tablePrice,
            tableTotal: totalTableNumber
        }

        const savedSpace: Space = await post({space: newSpace})

        const listFestival: Festival[] = [...festivals]
        const index: number = listFestival.findIndex(festival => festival.id === savedSpace.festival.id)
        listFestival[index].spaces.push(savedSpace)
        setFestivals([...listFestival])

        setLabel("")
        setMeterPrice(0)
        setTotalTableNumber(0)
        setTablePrice(0)

    }

    return (
        <Modal show={show} onHide={onHide} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Espaces de {festival.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {festival.spaces.length === 0 && <div>Aucun espace</div>}
                {festival.spaces.length > 0 &&
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Libellé</th>
                        <th scope="col">Prix table</th>
                        <th scope="col">Prix mètre</th>
                        <th scope="col">Nombre total tables</th>
                        <th scope="col">Nombre de tables restantes</th>
                        <th scope="col">Modification</th>
                    </tr>
                    </thead>
                    <tbody>
                    {festival.spaces.map((space, index) =>
                        <SpaceRow space={space} key={index} festival={festival}/>
                    )}
                    </tbody>
                </table>
                }
                <Row>
                    <Col>
                        <input
                            className="mon-input"
                            type="text"
                            required
                            value={label}
                            placeholder={"nom du l'espace"}
                            onChange={handleChange(setLabel)}
                        />
                    </Col>
                    <Col>
                        <input
                            className="mon-input"
                            type="number"
                            required
                            value={tablePrice}
                            placeholder={"prix d'une table"}
                            onChange={handleChange(setTablePrice)}
                        />
                    </Col>
                    <Col>
                        <input
                            className="mon-input"
                            type="number"
                            required
                            value={meterPrice}
                            placeholder={"prix du mètre carré"}
                            onChange={handleChange(setMeterPrice)}
                        />
                    </Col>
                    <Col>
                        <input
                            className="mon-input"
                            type="number"
                            required
                            placeholder={"nombre total de table"}
                            value={totalTableNumber}
                            onChange={handleChange(setTotalTableNumber)}
                        />
                    </Col>
                    <Col>
                        <button className="mon-validate-button mon-input" onClick={handleSubmit}>
                            Ajouter
                        </button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default SpacesModal;
