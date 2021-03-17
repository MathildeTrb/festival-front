import React, {FC, useContext, useState} from 'react';
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";
import Sidebar from "./components/Sidebar";
import "./css/index.css"
import {Col, Container, Row} from "react-bootstrap";

const App: FC = () => {

    return (
        <Container fluid>
            <Row>
                <Navbar/>
            </Row>
            <Row>
                <Col id={'sidebar-menu'} md={1}>
                        <Sidebar />
                </Col>
                <Col md={11}>
                    <Routes/>
                </Col>
            </Row>
        </Container>
    )

}

export default App;
