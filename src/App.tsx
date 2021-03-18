import {createContext, FC} from 'react';
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";
import useAxios from "./utils/useAxios";
import "./css/index.css"
import {Container} from "react-bootstrap";
import {Festival} from "./utils/types";

type FestivalContextProps = {
    selectedFestival: Festival;
    setSelectedFestival: (festival: Festival) => void;
}

export const FestivalContext = createContext<FestivalContextProps>({} as FestivalContextProps);

const App: FC = () => {

    const {data: selectedFestival, setData: setSelectedFestival, isPending} = useAxios<Festival>("festivals/current");

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
    )

}

export default App
