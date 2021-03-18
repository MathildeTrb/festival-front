import useToken from "../../utils/useToken";
import {useEffect, useState} from "react";
import axios from "../../utils/axios";
import {AiOutlineDelete} from 'react-icons/ai'
import {useHistory} from "react-router";
import ModalUpdateProfil from "./ModalUpdateProfil";

const Profil = () => {

    const {token, removeToken} = useToken()

    const [user, setUser] = useState(null)
    const [modalShow, setModalShow] = useState(false)

    const [isPending, setIsPending] = useState<boolean>(true);

    const history = useHistory()

    useEffect(() => {
        axios.get("users/profil", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then(res => {
            setUser(res.data)
            setIsPending(false)
        })
    }, [setUser, token])

    const deleteAccount = () => {
        axios.delete('users', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                    console.log(res.data)
                    removeToken();
                }
            )
        history.push("/")
    }

    const updateAccount = (user) => {

        axios.put("users", {"user": user}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then( res =>
            setUser(res.data)
        )

    }

    return (
        <>
            {isPending && <p>Is loading...</p>}
            {user &&
            <article>
                <h2>{user.firstname} {user.lastname}</h2>
                <p>id : {user.id}</p>
                <p>mail : {user.mail}</p>
                <p>fonction : {user.isAdmin ? "admin" : "organisateur"}</p>
                <button className="mon-delete-button" onClick={deleteAccount}>
                    <AiOutlineDelete/> suppression
                </button>
                <button className="mon-button" onClick={() => setModalShow(true)}>
                    modification
                </button>

                <ModalUpdateProfil
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onClick={updateAccount}
                    user={user}
                />

            </article>
            }
        </>
    );
}

export default Profil;
