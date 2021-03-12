import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Création de Festival</h1>
            <div className="links">
                <Link to="/allGames">Tous les jeux</Link>
                <Link to="/allEditeur">Voir tous les éditeurs</Link>
            </div>
        </nav>
    );
}

export default Navbar;
