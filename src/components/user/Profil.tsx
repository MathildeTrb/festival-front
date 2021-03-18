import useToken from "../../utils/useToken";
import {useEffect, useState} from "react";
import axios from "../../utils/axios";
import {AiOutlineDelete} from 'react-icons/ai'
import {BsPencilSquare} from 'react-icons/bs'
import {useHistory} from "react-router";
import ModalUpdateProfil from "./ModalUpdateProfil";
import {User} from "../../utils/types";

const Profil = () => {

    const {token, removeToken} = useToken()

    const [user, setUser] = useState<User>(null)
    const [modalShow, setModalShow] = useState(false)

    const [isPending, setIsPending] = useState<boolean>(true);

    const history = useHistory()

    useEffect(() => {
        console.log(token)
        axios.get<User>("users/profil", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then(({data}) => {
            setUser(data)
            setIsPending(false)
        }).catch(err => console.log(err))
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
        axios.put("users/account", {"user": user}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then( res => {
            setUser(res.data)
            }
        ).catch(err => console.log(err))
    }

    const updatePassword = (passwordManaged) => {
        console.log(passwordManaged)
        axios.put("users/password", {"passwordManaged": passwordManaged},{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then(res => console.log(res.data))
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
                    <BsPencilSquare/> modification
                </button>

                <ModalUpdateProfil
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    updateAccount={updateAccount}
                    updatePassword={updatePassword}
                    user={user}
                />

            </article>
            }
        </>
    );
}

export default Profil;
