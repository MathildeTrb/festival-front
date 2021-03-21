import {RiDeleteBin6Line} from "react-icons/ri";
import ValidationDeleteModal from "../ValidationDeleteModal";
import useToken from "../../utils/useToken";
import {FC, useState} from "react";
import axios from "../../utils/axios";
import {User} from "../../utils/types";


const UsersRow: FC<{user: User, onDelete: (user: User) => void}> = ({user, onDelete}) => {

    const {token, isAdmin} = useToken()
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const deleteProfil = () => {
        axios.delete("users/"+ user.id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then(() => {
            onDelete(user)
            setShowModal(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <tr>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.mail}</td>
            <td>{user.isAdmin ? "administrateur" : "organisateur"}</td>
            {isAdmin() && <td><RiDeleteBin6Line onClick={handleShowModal}/></td>}
            <ValidationDeleteModal show={showModal} message="Êtes-vous sûr de vouloir supprimer ce compte ?" onDelete={deleteProfil} onHide={handleCloseModal}/>
        </tr>
    )

}

export default UsersRow
