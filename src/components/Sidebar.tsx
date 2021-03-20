import {Link} from "react-router-dom";
import "../css/index.css"

const Sidebar = () => {
    return (
        <nav>
            <div className={"sidebar-ul"}>
                <ul className={"nav flex-column"}>
                    <li className={"nav-item sidebar-li"}>
                        <h5>Mes listes</h5>
                    </li>
                    <li className={"nav-item sidebar-li"}>
                        <Link className={"sidebar-link"} to ="/allGames"> Jeux </Link>
                    </li>
                    <li className={"nav-item sidebar-li"}>
                        <Link className={"sidebar-link"} to ="/allCompanies"> Entreprises </Link>
                    </li>
                    <li>
                        <Link className={"sidebar-link"} to ="/allUsers"> Bénévoles </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar
