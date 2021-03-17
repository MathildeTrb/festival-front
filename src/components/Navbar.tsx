import {Link} from "react-router-dom";
import "../css/index.css"
import {Col, Dropdown, Image, Nav, Navbar as BootstrapNavbar, NavDropdown, Row} from "react-bootstrap";
import useFetch from "../utils/useFetch";
import logo from "../pictures/logo_FDJ_FINAL_800.png"

const Navbar = () => {

    const {data: festivals, error, isPending} = useFetch("http://localhost:8000/festivals")
    const {data: currentFestival, setData: setCurrentFestival} = useFetch("http://localhost:8000/festivals/current")

    const handleChange = (eventKey, event) => {
        setCurrentFestival(JSON.parse(eventKey))
    }

    const handleClick = () => {
        console.log(currentFestival)
    }

    return (
        <div>
            {isPending && <div>loading... </div>}
            {error && <div>{error}</div>}
            {festivals && currentFestival &&
            <Row>
                <Col md={2}>
                    <Image src={logo} fluid onClick={handleClick}/>
                </Col>
                <Col md={9}>
                    <Nav fill variant="tabs" defaultActiveKey="/">
                        <Nav.Item>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    {currentFestival.name}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {festivals.map((festival, index) =>
                                        <Dropdown.Item as="button" value={festival} key={index} eventKey={JSON.stringify(festival)} onSelect={handleChange}>
                                            {festival.name}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/" className='nav-link'>Dashboard</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={`/${currentFestival.id}/exhibitors`} className='nav-link'>Réservation
                                exposant</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={`/${currentFestival.id}/games`} className='nav-link'>Réservation jeu</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={`/${currentFestival.id}/invoicing`} className='nav-link'>Facturation</Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
            }
        </div>
    )
}

export default Navbar;
