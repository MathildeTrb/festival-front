import {useContext, useState} from "react";
import jwtDecode from "jwt-decode";
import {AuthContext} from "../App";

interface Token {
    id: number,
    isAdmin: boolean
}

const useToken = () => {

    const{isLogged : authIsLogged, setIsLogged : setAuthIsLogged} = useContext(AuthContext)

    const getToken = (): string => {
        const tokenString: string = localStorage.getItem("token");
        return JSON.parse(tokenString);
    }

    const [token, setToken] = useState<string>(getToken());

    const saveToken = userToken => {
        localStorage.setItem("token", JSON.stringify(userToken));
        setToken(userToken.token);
        setAuthIsLogged(true);
    }

    const removeToken = () => {
        localStorage.removeItem("token");
        setToken(null);
        setAuthIsLogged(false)
    }

    const isLogged = () => {

        try {
            jwtDecode(token);
            return true;
        } catch (e) {
            return false;
        }
    }

    const isAdmin = () => {
        const decodedToken: Token = jwtDecode(token);
        return decodedToken.isAdmin;
    }

    return {
        token,
        saveToken,
        removeToken,
        isAdmin,
        isLogged
    };
}

export default useToken;
