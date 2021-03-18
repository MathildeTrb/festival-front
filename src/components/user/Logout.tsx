import useToken from "../../utils/useToken";
import {useEffect} from "react";
import {useHistory} from "react-router";


const Logout = () => {

    const {removeToken} = useToken()
    const history = useHistory();

    useEffect(() => {
        removeToken();
        history.push("/")
    })

    return (
        <div className="create">
        </div>
    );
}

export default Logout;
