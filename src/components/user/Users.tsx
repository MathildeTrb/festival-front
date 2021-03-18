import useAxios from "../../utils/useAxios";

const Users = () => {

    const {data: loadedUsers, isPending, error} = useAxios("users")

    return (
        <>
            {isPending && <p>Is loading ...</p>}
            {error && <p>{error}</p>}
            {loadedUsers &&
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">mail</th>
                    <th scope="col">fonction</th>
                </tr>
                </thead>
                <tbody>
                {loadedUsers.map((user) => {
                    return (
                        <tr>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.mail}</td>
                            <td>{user.isAdmin ? "6administrateur" : "organisateur"}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            }
        </>
    );
}

export default Users;
