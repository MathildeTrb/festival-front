import {Link} from "react-router-dom";
import "../css/index.css"
import {Col, Dropdown, Image, Nav, Row} from "react-bootstrap";
import logo from "../pictures/logo_FDJ_FINAL_800.png"
import useAxios from "../utils/useAxios";
import {useContext} from "react";
import {FestivalContext} from "../App";


const Navbar = () => {

    const {data: festivals, error, isPending} = useAxios("festivals")
    //const {data: selectedFestival, setData: setSelectedFestival} = useAxios("festivals/current")

    const {selectedFestival, setSelectedFestival} = useContext(FestivalContext);

    const handleChange = (eventKey) => {
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
                <Col md={2}>
                    <Dropdown className="button">
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
                <Col md={8}>
                    <Nav fill variant="tabs" defaultActiveKey="/">
                        <Nav.Item>
                            <Link to="/" className='nav-link'>Dashboard</Link>
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
                    </Nav>
                </Col>
            </Row>
            }
        </div>
    )
}

export default Navbar
