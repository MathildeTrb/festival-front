import {Link} from "react-router-dom";
import {Col, Image, Nav, NavDropdown, Row} from "react-bootstrap";
import logo from "../../pictures/logo_FDJ_FINAL_800.png"
import useAxios from "../../utils/useAxios";
import {useContext, useState} from "react";
import {FestivalContext} from "../../App";
import {BiUser} from 'react-icons/bi'
import {HiOutlineInformationCircle} from 'react-icons/hi'
import {FaGamepad, FaFileInvoiceDollar, FaList} from 'react-icons/fa'
import {AiOutlineAudit} from 'react-icons/ai'
import {Festival} from "../../utils/types";
import FestivalSelection from "../festival/FestivalSelection";
import useToken from "../../utils/useToken";

const NavbarLogged = () => {

    const {data: festivals, setData: setFestivals, error, isPending} = useAxios<Festival[]>("festivals")

    const {selectedFestival} = useContext(FestivalContext);

    const {isLogged} = useToken()
    const [loggedNavbar, setLoggedNavbar] = useState(isLogged())

    return (


        <div>
            {isPending && <div>loading... </div>}
            {error && <div>{error}</div>}
            {festivals && selectedFestival && loggedNavbar &&
            <Row>
                <Col md={2}>
                    <Image className="image-css" src={logo} fluid/>
                </Col>
                <Col md={1} className={"navbar-col"}>
                    <FestivalSelection festivals={festivals} setFestivals={setFestivals}/>
                </Col>
                <Col md={9} className={"navbar-col"}>
                    <Nav fill variant="tabs" defaultActiveKey="/">
                        <Nav.Item className='nav-item'>
                            <Link to="/" className='nav-link'><HiOutlineInformationCircle/> Informations du festival</Link>
                        </Nav.Item>
                        <Nav.Item className='nav-item'>
                            <Link to={`/${selectedFestival.id}/exhibitors`} className='nav-link'> <AiOutlineAudit/> Réservations
                                exposants</Link>
                        </Nav.Item>
                        <Nav.Item className='nav-item'>
                            <Link to={`/${selectedFestival.id}/gameMonitorings`} className='nav-link'> <FaGamepad/> Réservations jeux</Link>
                        </Nav.Item>
                        <Nav.Item className='nav-item'>
                            <Link to="/invoices" className='nav-link'> <FaFileInvoiceDollar/> Facturations du festival</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title={<> <FaList/> Informations générales </>} id="basic-nav-dropdown">
                                <NavDropdown.Item >
                                    <Link className={"nav-link"} to ="/games"> Jeux </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >
                                    <Link className={"nav-link"} to ="/companies"> Entreprises </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >
                                    <Link className={"nav-link"} to ="/allUsers"> Bénévoles </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >
                                    <Link className={"nav-link"} to ="/festivals"> Festivals </Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                        <Nav.Item className='nav-item'>
                            <NavDropdown title={<BiUser/>} id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <Link to="/profil" className='nav-link'>Profil</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <Link to="/logout" className='nav-link'>Déconnexion</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
            }
        </div>
    )
}

export default NavbarLogged
