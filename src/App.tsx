import {createContext, FC, useState} from 'react';
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";
import useAxios from "./utils/useAxios";
import Sidebar from "./components/Sidebar";
import "./css/index.css"
import {Col, Container, Row} from "react-bootstrap";


export const FestivalContext = createContext({
    selectedFestival: {
        id: 0,
        name: "",
        isCurrent: false
    },
    setSelectedFestival: (festival: any) => {
    }
})

const App: FC = () => {

    const {data: selectedFestival, setData: setSelectedFestival, isPending} = useAxios("festivals/current");

    const value = {selectedFestival, setSelectedFestival}

    return (
        <Container fluid>
            {isPending && <div>Is loading ...</div>}
            {selectedFestival &&
            <FestivalContext.Provider value={value}>
                <Navbar/>
                <Routes/>
            </FestivalContext.Provider>}
        </Container>
        // <Container fluid>
        //     {isPending && <div>Is loading ...</div>}
        //     {selectedFestival &&
        //     <FestivalContext.Provider value={value}>
        //         <Row>
        //             <Navbar/>
        //         </Row>
        //         <Row>
        //             <Col id={'sidebar-menu'} md={1}>
        //                 <Sidebar />
        //             </Col>
        //             <Col md={11}>
        //                 <Routes/>
        //             </Col>
        //         </Row>
        //     </FestivalContext.Provider>}
        // </Container>

    )

}

export default App
