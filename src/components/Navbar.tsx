import {Link} from "react-router-dom";
import "../css/index.css"
import {Col, Dropdown, Image, Nav, Row} from "react-bootstrap";
import useFetch from "../utils/useFetch";
import logo from "../pictures/logo_FDJ_FINAL_800.png"

const Navbar = () => {

    const {data: festivals, error, isPending} = useFetch("http://localhost:8000/festivals")
    const {data: selectedFestival, setData: setSelectedFestival} = useFetch("http://localhost:8000/festivals/current")

    const handleChange = (eventKey, event) => {
        setSelectedFestival(JSON.parse(eventKey))
    }

    const handleClick = () => {
        console.log(selectedFestival)
    }

    return (
        <div>
            {isPending && <div>loading... </div>}
            {error && <div>{error}</div>}
            {festivals && selectedFestival &&
            <Row>
                <Col md={2}>
                    <Image src={logo} fluid onClick={handleClick}/>
                </Col>
                <Col md={2} className={"navbar-col"}>
                    <Dropdown className={"button"}>
                        <Dropdown.Toggle id="dropdown-basic">
                            {selectedFestival.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {festivals.map((festival, index) =>
                                <Dropdown.Item as="button" value={festival} key={index}
                                               eventKey={JSON.stringify(festival)} onSelect={handleChange}>
                                    {festival.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={8} className={"navbar-col"}>
                    <Nav fill variant="tabs" defaultActiveKey="/">
                        <Nav.Item>
                            <Link to="/" className='nav-link'>Informations générales</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={`/${selectedFestival.id}/exhibitors`} className='nav-link'>Réservation
                                exposant</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={`/${selectedFestival.id}/games`} className='nav-link'>Réservation jeu</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={`/${selectedFestival.id}/invoicing`} className='nav-link'>Facturation</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/profil" className='nav-link'>profil</Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
            }
        </div>
    )
}

export default Navbar
