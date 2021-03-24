import {useContext, useEffect} from "react";
import {AuthContext} from "../../App";
import NavbarLogged from "./NavbarLogged";
import NavbarVisitor from "./NavbarVisitor";

const GeneralNavbar = () => {

    const {isLogged} = useContext(AuthContext)

    useEffect(() => {
        console.log(isLogged)
    }, [isLogged])

    return (
        <>
            {isLogged ?
                <NavbarLogged/>:
                <NavbarVisitor/>
            }
        </>
    )

}

export default GeneralNavbar
