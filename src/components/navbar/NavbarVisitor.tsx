import {Col, Image, Nav, NavDropdown, Row} from "react-bootstrap";
import logo from "../../pictures/logo_FDJ_FINAL_800.png";
import {HiOutlineInformationCircle} from "react-icons/hi";
import {BiUser} from "react-icons/bi";
import useAxios from "../../utils/useAxios";
import {Link} from "react-router-dom";
import {Festival} from "../../utils/types";

const NavbarVisitor = () => {

    const {data: currentFestival} = useAxios<Festival>("festivals/current")

    return (
        <div>
            {currentFestival &&
            <Row>
                <Col md={2}>
                    <Link to="/"><Image className="image-css" src={logo} fluid/></Link>
                </Col>
                <Col md={6} className={"navbar-col"}>
                    <h2>Bienvenue au {currentFestival.name}</h2>
                </Col>
                <Col md={2} className={"navbar-col"}>
                    <Nav fill variant="tabs" defaultActiveKey="/">
                        <Nav.Item className='nav-item'>
                            <NavDropdown title={<BiUser/>} id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <Link to="/profil" className='nav-link'>Profil</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>}
        </div>
    )
}
export default NavbarVisitor;
