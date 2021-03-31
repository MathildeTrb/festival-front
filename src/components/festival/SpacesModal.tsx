import {FC} from "react";
import {Modal} from "react-bootstrap";
import {Festival} from "../../utils/types";
import {RiDeleteBin6Line} from "react-icons/ri";

const SpacesModal: FC<{ show: boolean, onHide: () => void, festival: Festival }> = ({show, onHide, festival}) => {
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
                        <th scope="col">Suppression</th>
                    </tr>
                    </thead>
                    <tbody>
                    {festival.spaces.map((space, index) => {
                        return (
                            <tr key={index}>
                                <td>{space.label}</td>
                                <td>{space.tablePrice} €</td>
                                <td>{space.meterPrice} €</td>
                                <td>{space.tableTotal}</td>
                                <td>{space.tableRemaining}</td>
                                <td>{RiDeleteBin6Line}</td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
                }
            </Modal.Body>
        </Modal>
    )
}

export default SpacesModal;
