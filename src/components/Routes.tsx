import {FC} from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import GameMonitoringList from "./GameMonitoringList";
import ExhibitorMonitoringList from "./ExhibitorMonitoringList";
import InvoicingList from "./InvoicingList";

const Routes: FC = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/:idFestival/games" component={GameMonitoringList}/>
            <Route exact path='/:idFestival/exhibitors' component={ExhibitorMonitoringList}/>
            <Route exact path='/:idFestival/invoicing' component={InvoicingList}/>
            <Route path='*'>
                <NotFound/>
            </Route>
        </Switch>
    )
}

export default Routes
