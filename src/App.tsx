import {createContext, FC, useEffect, useState} from 'react';
import NavbarLogged from "./components/navbar/NavbarLogged";
import Routes from "./components/route/Routes";
import useAxios from "./utils/useAxios";
import "./css/index.css"
import {Container} from "react-bootstrap";
import {Festival} from "./utils/types";
import useToken from "./utils/useToken";
import NavbarVisitor from "./components/navbar/NavbarVisitor";

type FestivalContextProps = {
    selectedFestival: Festival;
    setSelectedFestival: (festival: Festival) => void;
}

export const FestivalContext = createContext<FestivalContextProps>({} as FestivalContextProps);

const App: FC = () => {

    //TODO : deal with the connexion

    const {data: selectedFestival, setData: setSelectedFestival, isPending} = useAxios<Festival>("festivals/current");
    const value = {selectedFestival, setSelectedFestival}

    const {isLogged} = useToken()
    const [loggedNavbar, setLoggedNavbar] = useState(isLogged())

    return (
        <Container fluid>
            {isPending && <div>Is loading ...</div>}
            {selectedFestival &&
            <FestivalContext.Provider value={value}>
                {loggedNavbar? <NavbarLogged/> : <NavbarVisitor/>}
                <Routes/>
            </FestivalContext.Provider>}
        </Container>
    )

}

export default App;
