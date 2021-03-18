import useAxios from "../../utils/useAxios";
import {Col, Row} from "react-bootstrap";
import useToken from "../../utils/useToken";
import UsersRow from "./UsersRow";
import {User} from "../../utils/types";

const Users = () => {

    const {data: loadedUsers, isPending, error, setData: setLoadedUsers} = useAxios<User[]>("users")
    const {isAdmin} = useToken()

    const handleDelete = user => {
        setLoadedUsers(loadedUsers.filter(value => value.id !== user.id))
    }

    return (
        <div>
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

            }
        </div>
    );
}

export default Users;
