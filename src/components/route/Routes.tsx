import {FC} from "react";
import {Switch, Route} from "react-router-dom";
import Home from "../home/Home";
import NotFound from "../NotFound";
import ExhibitorMonitoringList from "../exhibitorMonitoring/ExhibitorMonitoringList";
import {Container} from "react-bootstrap";
import Login from "../user/Login";
import Profil from "../user/Profil";
import Register from "../user/Register";
import Users from "../user/Users";
import PrivateRoute from "./PrivateRoute";
import Logout from "../user/Logout";
import Games from "../game/Games";
import Festivals from "../festival/Festivals";
import Companies from "../company/Companies";
import GameMonitorings from "../gameMonitoring/GameMonitorings";
import Invoices from "../invoice/Invoices";
import ExhibitorDashboard from "../exhibitorMonitoring/dashboard/ExhibitorDashboard";
import HomeVisitor from "../home/HomeVisitor";

const Routes: FC = () => {
    return (
        <Container fluid>
            <Switch>
                <Route exact path="/" component={HomeVisitor}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path='/exhibitors' component={ExhibitorMonitoringList}/>
                <Route exact path="/invoices" component={Invoices}/>
                <PrivateRoute exact path='/profil' component={Profil}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <PrivateRoute exact path='/users' component={Users}/>
                <PrivateRoute exact path="/games" component={Games}/>
                <Route exact path="/festivals" component={Festivals}/>
                <Route exact path='/logout' component={Logout}/>
                <PrivateRoute exact path="/companies" component={Companies}/>
                <Route exact path="/gameMonitorings" component={GameMonitorings}/>
                <Route exact path="/dashboard/:idExhibitor" component={ExhibitorDashboard}/>
                <Route path='*'>
                    <NotFound/>
                </Route>
            </Switch>
        </Container>
    )
}

export default Routes
