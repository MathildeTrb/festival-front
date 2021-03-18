import {Link} from "react-router-dom";
import "../css/index.css"
import {Col, Dropdown, Image, Nav, NavDropdown, Row} from "react-bootstrap";
import logo from "../pictures/logo_FDJ_FINAL_800.png"
import useAxios from "../utils/useAxios";
import {useContext} from "react";
import {FestivalContext} from "../App";


const Navbar = () => {

    const {data: festivals, error, isPending} = useAxios("festivals")

    const {selectedFestival, setSelectedFestival} = useContext(FestivalContext);

    const handleChange = (eventKey) => {
        setSelectedFestival(JSON.parse(eventKey))
    }

    return (
        <div>
            {isPending && <div>loading... </div>}
            {error && <div>{error}</div>}
            {festivals && selectedFestival &&
            <Row>
                <Col md={2}>
                    <Image className="image-css" src={logo} fluid/>
                </Col>
                <Col md={2} className={"navbar-col"}>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            {selectedFestival.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {festivals.map((festival, index) =>
                                <Dropdown.Item as="button" value={festival} key={index} eventKey={JSON.stringify(festival)} onSelect={handleChange}>
                                    {festival.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={8} className={"navbar-col"}>
                    <Nav fill variant="tabs" defaultActiveKey="/">
                        <Nav.Item className='nav-item'>
                            <Link to="/" className='nav-link'>Informations du festival</Link>
                        </Nav.Item>
                        <Nav.Item className='nav-item'>
                            <Link to={`/${selectedFestival.id}/exhibitors`} className='nav-link'>Réservations
                                exposants</Link>
                        </Nav.Item>
                        <Nav.Item className='nav-item'>
                            <Link to={`/${selectedFestival.id}/games`} className='nav-link'>Réservations jeux</Link>
                        </Nav.Item>
                        <Nav.Item className='nav-item'>
                            <Link to={`/${selectedFestival.id}/invoicing`} className='nav-link'>Facturations du festival</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="Informations de l'association" id="basic-nav-dropdown">
                                <NavDropdown.Item >
                                    <Link className={"nav-link"} to ="/allGames"> Jeux </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >
                                    <Link className={"nav-link"} to ="/allCompanies"> Entreprises </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >
                                    <Link className={"nav-link"} to ="/allUsers"> Bénévoles </Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                        <Nav.Item className='nav-item'>
                            <Link to="/profil" className='nav-link'>Profil</Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
            }
        </div>
    )
}

export default Navbar
