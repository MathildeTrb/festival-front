import {createContext, FC, useState} from 'react';
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";
import useAxios from "./utils/useAxios";

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
    /*const [selectedFestival, setSelectedFestival] = useState({
        id: 5,
        name: "Festival de Mathou",
        isCurrent: true
    })*/
    const value = {selectedFestival, setSelectedFestival}

    return (
        <>
            {isPending && <div>Is loading le con de ta race</div>}
            {selectedFestival &&
            <FestivalContext.Provider value={value}>
                <div>
                    <Navbar/>
                    <Routes/>
                </div>
            </FestivalContext.Provider>}
        </>

    )

}

export default App;
