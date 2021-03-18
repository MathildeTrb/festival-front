import useAxios from "../../utils/useAxios";
import {Col, Row} from "react-bootstrap";
import useToken from "../../utils/useToken";
import UsersRow from "./UsersRow";
import {VscDiffAdded} from "react-icons/vsc"
import {useState} from "react";
import ModalAddUser from "./ModalAddUser";
import {User} from "../../utils/types";

const Users = () => {

    const {data: loadedUsers, setData: setLoadedUsers, isPending, error} = useAxios("users")
    const {isAdmin} = useToken()

    const [modalShow, setModalShow] = useState(false)

    const handleDelete = user => {
        setLoadedUsers(loadedUsers.filter(value => value.id !== user.id))
    }

    const handleCreate = (user : User) => {

    }

    const handleShowModal = () => {
        setModalShow(true)
    }

    const handleCloseModal = () => {
        setModalShow(false)
    }

    return (
        <div>
            {isPending && <p>Is loading ...</p>}
            {error && <p>{error}</p>}
            {loadedUsers &&
                <div>
                    <Row>
                        <Col md={2}>

                        </Col>
                        <Col md={8}>
                            <table className="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Prénom</th>
                                    <th scope="col">mail</th>
                                    <th scope="col">fonction</th>
                                    {isAdmin() && <th scope="col"/>}
                                </tr>
                                </thead>
                                <tbody>
                                {loadedUsers.map((user, index) => <UsersRow key={index} user={user} onDelete={handleDelete}/>)}
                                </tbody>
                            </table>
                        </Col>
                        <Col md={8}>

                        </Col>
                    </Row>
                    <Row>
                        <VscDiffAdded onClick={handleShowModal}/>
                        <ModalAddUser show={modalShow} onHide={handleCloseModal} addAcount={handleCreate}/>
                    </Row>
                </div>

            }
        </div>
    );
}

export default Users;
