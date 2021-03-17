import useToken from "../utils/useToken";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {

    const {token} = useToken();

    return (
        <Route {...rest} render={props => {

            const redirectParams = {
                pathname: "/user/login",
                state: {
                    from: props.location,
                }
            }

            return !token ? <Redirect to={redirectParams}/> : <Component {...props}/>;
        }}
        />
    )
}

export default PrivateRoute;
