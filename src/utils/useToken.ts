import {useState} from "react";
import jwtDecode from "jwt-decode";

interface Token {
    id: number,
    isAdmin: boolean
}

const useToken = () => {

    const getToken = (): string => {
        const tokenString: string = localStorage.getItem("token");
        return JSON.parse(tokenString);
    }

    const [token, setToken] = useState<string>(getToken());

    const saveToken = userToken => {
        localStorage.setItem("token", JSON.stringify(userToken));
        setToken(userToken.token);
    }

    const removeToken = () => {
        localStorage.removeItem("token");
        setToken(null);
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
