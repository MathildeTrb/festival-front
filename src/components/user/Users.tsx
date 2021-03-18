import useAxios from "../../utils/useAxios";
import {RiDeleteBin6Line} from "react-icons/ri"
import {Col, Row} from "react-bootstrap";

const Users = () => {

    const {data: loadedUsers, isPending, error} = useAxios("users")

    return (
        <>
            {isPending && <p>Is loading ...</p>}
            {error && <p>{error}</p>}
            {loadedUsers &&
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
                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                            {loadedUsers.map((user) => {
                                return (
                                    <tr>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.mail}</td>
                                        <td>{user.isAdmin ? "administrateur" : "organisateur"}</td>
                                        <td><RiDeleteBin6Line/></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </Col>
                    <Col md={8}>

                    </Col>
                </Row>

            }
        </>
    );
}

export default Users;
