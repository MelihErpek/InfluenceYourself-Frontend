import React, { useEffect } from 'react'
import { Nav, Navbar, Container, Button, ButtonToolbar } from 'react-bootstrap';
import { Row, Col, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { setLoggedIn, setAdminTab } from "../../Redux/stores/UserInf"
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { FaLink } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { VscSettingsGear } from "react-icons/vsc";
import '../../App.css';
/*
 <Navbar bg="light" expand="lg" className="border-bottom" style={{ height: '7.5vh' }}>
                    <Container fluid>
                        <Navbar.Brand onClick={home}>influenceyourself</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}

                            >
                                <Nav.Link onClick={home}>Home</Nav.Link>

                            </Nav>

                            <ButtonToolbar>
                                <Button variant="success" onClick={logout}>Log Out</Button>
                            </ButtonToolbar>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>

------------------------------------------------------------------------------------------------------------------------------------------------------------

                <div className="Tabs" onClick={() => { tabLinks("StatTab") }}>
                                <div className="iconRight" ><FaChartBar />    My Statistics</div>
                            </div>
                            <div className="Tabs" onClick={() => { tabLinks("ProfilePage") }}>
                                <div className="iconRight" ><FaArrowRight />  Profile Page</div>
                            </div>

                    <div className="Tabs">
                                <div className="iconRight"><FaRegUser /> Profile</div>
                            </div>
*/
export default function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const home = () => {
        history.push("/");
    }
    const login = () => {
        history.push("/login");
    }
    const signup = () => {
        history.push("/register");
    }
    const logout = () => {
        dispatch(setLoggedIn(false))
        localStorage.setItem("a-2022-t", "");
        localStorage.setItem('loIn', false);
        history.push("/");
    }
    const tabLinks = (x) => {
        dispatch(setAdminTab(x))
    }
    const img = useSelector(state => state.userInfo.userInf.ProfilePicture);
    const loggedIn = useSelector(state => state.userInfo).loggedIn;
    useEffect(() => {
        setLoggedIn(localStorage.getItem("IoIn"));
    }, [localStorage.getItem("IoIn"), loggedIn])
    return (
        <Col >
            {loggedIn ? (
                <Col >
                    <Row >
                        <Col className="d-none d-lg-block dashboard"  >
                            <div className="adminLeftSide">
                                <div>
                                    influenceyourself
                                </div>
                                <div className="adminInfo" >
                                    <Row>
                                        <Col md={6} >
                                            <Image src={img} style={{ width: ' 100%', borderRadius: '100px' }} alt="idk.com" />
                                        </Col>
                                        <Col md={6}>
                                            <Row>
                                                <div className="AdSoyad">
                                                    Melih Erpek
                                                </div>

                                            </Row>

                                        </Col>
                                    </Row>
                                </div>
                                <div className="Tabs" onClick={() => { tabLinks("LinkTab") }}>
                                    <div className="iconRight"><FaLink />    Links</div>
                                </div>


                                <div className='Account'>
                                    Account
                                </div>




                                <div className="TabsSignOut " onClick={() => { logout() }} >
                                    <div className="iconRight" ><FaSignOutAlt />  Sign Out</div>
                                </div>




                            </div>
                        </Col>

                    </Row>

                </Col>)
                : (<div>
                    <Navbar bg="light" expand="lg" className="border-bottom" style={{ height: '7.5vh' }}>
                        <Container fluid>
                            <Navbar.Brand onClick={home}>influenceyourself</Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}

                                >
                                    <Nav.Link onClick={home}>Home</Nav.Link>

                                </Nav>

                                <ButtonToolbar>
                                    <Button variant="outline-success" className="me-3" onClick={login}>Login</Button>
                                    <Button variant="success" onClick={signup}>Sign Up</Button>
                                </ButtonToolbar>

                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                </div>)}
        </Col>
    )
}
