import React, {FC, useContext, useState} from 'react';
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";
import useFetch from "./utils/useFetch";
import {Col} from "react-bootstrap";

const festival = {id: 0, name: "", isCurrent:false}
export const ContextCurrentFestival = React.createContext(festival)

const App: FC = () => {

    const {data: currentFestival, setData: setCurrentFestival} = useFetch("http://localhost:8000/festivals/current")
    const [value, setValue] = useState(currentFestival)


    return (
        <ContextCurrentFestival.Provider value={currentFestival}>
            <div>
                <Navbar/>
                <Routes/>
            </div>
        </ContextCurrentFestival.Provider>
    )

}

export default App;
