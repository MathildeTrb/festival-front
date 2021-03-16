import {FC} from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./Home";
import GamesList from "./GamesList";

const Routes: FC = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/allGames" component={GamesList}/>
            <Route exact path="/allEditors" component={GamesList}/>
        </Switch>
    )
}

export default Routes
