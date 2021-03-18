import useToken from "../../utils/useToken";
import {useEffect, useState} from "react";
import axios from "../../utils/axios";

const Profil = () => {

    const {token} = useToken()

    const[user, setUser] = useState(null)

    useEffect(() => {
        axios.get("users/profil", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then(res => {
            setUser(res.data)
        })
    }, [setUser])

    console.log(user)

    return (
        <>
            {user &&
            <article>
                <h2>{user.firstname} {user.lastname}</h2>
                <p>id : {user.id}</p>
                <p>mail : {user.mail}</p>
                <p>fonction : {user.isAdmin ? "admin"  : "organisateur" }</p>
                <button className="mon-button">suppression du compte</button>
            </article>
            }
        </>
    );
}

export default Profil;
