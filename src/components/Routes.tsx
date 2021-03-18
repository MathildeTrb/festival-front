import {FC} from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import GameMonitoringList from "./GameMonitoringList";
import ExhibitorMonitoringList from "./ExhibitorMonitoringList";
import InvoicingList from "./InvoicingList";
import {Container} from "react-bootstrap";
import Login from "./user/Login";
import Profil from "./user/Profil";
import Register from "./user/Register";
import Users from "./user/Users";
import PrivateRoute from "./PrivateRoute";

const Routes: FC = () => {
    return (
        <Container fluid>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/:idFestival/games" component={GameMonitoringList}/>
                <Route exact path='/:idFestival/exhibitors' component={ExhibitorMonitoringList}/>
                <Route exact path='/:idFestival/invoicing' component={InvoicingList}/>
                <PrivateRoute exact path='/profil' component={Profil}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/allUsers' component={Users}/>
                //TODO: créer les components
                <Route path='*'>
                    <NotFound/>
                </Route>
            </Switch>
        </Container>
    )
}

export default Routes
