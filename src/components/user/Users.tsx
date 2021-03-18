import useAxios from "../../utils/useAxios";
import {Col, Row} from "react-bootstrap";
import useToken from "../../utils/useToken";
import UsersRow from "./UsersRow";
import {VscDiffAdded} from "react-icons/vsc"
import {useState} from "react";
import ModalAddUser from "./ModalAddUser";
import {User} from "../../utils/types";
import axios from "../../utils/axios";

const Users = () => {

    const {data: loadedUsers, isPending, error, setData: setLoadedUsers} = useAxios<User[]>("users")
    const {isAdmin} = useToken()

    const [modalShow, setModalShow] = useState(false)

    const handleDelete = user => {
        setLoadedUsers(loadedUsers.filter(value => value.id !== user.id))
    }

    const handleCreate = (user : User) => {
        axios.post("users/register", user)
            .then(res => setLoadedUsers([...loadedUsers, res.data]))
            .catch(err => console.log(err))
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
                        <Col md={2}/>
                        <Col md={8}>
                            <VscDiffAdded onClick={handleShowModal}/>
                            <ModalAddUser show={modalShow} onHide={handleCloseModal} addAccount={handleCreate}/>
                        </Col>
                        <Col md={2}/>
                    </Row>
                </div>

            }
        </div>
    );
}

export default Users;
