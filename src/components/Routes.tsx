import {FC} from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./Home";

const Routes: FC = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
        </Switch>
    )
}

export default Routes
