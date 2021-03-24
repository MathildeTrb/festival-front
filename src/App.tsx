import {createContext, FC, useContext, useEffect, useState} from 'react';
import NavbarLogged from "./components/navbar/NavbarLogged";
import Routes from "./components/route/Routes";
import useAxios from "./utils/useAxios";
import "./css/index.css"
import {Container} from "react-bootstrap";
import {Festival, User} from "./utils/types";
import useToken from "./utils/useToken";
import NavbarVisitor from "./components/navbar/NavbarVisitor";
import GeneralNavbar from "./components/navbar/GeneralNavbar";

type FestivalContextProps = {
    selectedFestival: Festival;
    setSelectedFestival: (festival: Festival) => void;
}
export const FestivalContext = createContext<FestivalContextProps>({} as FestivalContextProps);

type AuthContextProps = {
    isLogged: boolean;
    setIsLogged: (bool: boolean) => void;
}
export const AuthContext = createContext<AuthContextProps>({

} as AuthContextProps)

const App: FC = () => {

    //TODO : deal with the connexion

    const {data: selectedFestival, setData: setSelectedFestival, isPending} = useAxios<Festival>("festivals/current");
    const value = {selectedFestival, setSelectedFestival}

    const {isLogged} = useToken()
    const [isLoggedAuthContext, setIsLoggedAuthContext] = useState<boolean>(isLogged())
    const authContextValue = {isLogged : isLoggedAuthContext, setIsLogged : setIsLoggedAuthContext}

    return (
        <Container fluid>
            {isPending && <div>Is loading ...</div>}
            {selectedFestival &&
            <FestivalContext.Provider value={value}>
                <AuthContext.Provider value={authContextValue}>
                    <GeneralNavbar/>
                    <Routes/>
                </AuthContext.Provider>
            </FestivalContext.Provider>}
        </Container>
    )

}

export default App;
