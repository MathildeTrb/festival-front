import {Link} from "react-router-dom";
import "../css/index.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Création de Festival</h1>
            <div>
                <Link className="a" to="/allGames">Tous les jeux</Link>
                <Link className="a" to="/allEditors">Voir tous les éditeurs</Link>
            </div>
        </nav>
    );
}

export default Navbar;
