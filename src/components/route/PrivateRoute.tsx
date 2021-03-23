import useToken from "../../utils/useToken";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {

    const {token} = useToken();

    return (
        <Route {...rest} render={props => {

            const redirectParams = {
                pathname: "/login",
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
