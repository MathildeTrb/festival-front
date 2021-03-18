import React from "react";
import {Table} from "react-bootstrap";
import useFetch from "../utils/useFetch";

const GamesOld = ({games}) => {
    return(
        <Table striped bordered hover variant='dark'>
            <thead>
            <tr>
                <th>#</th>
                <th>Jeu</th>
                <th>Editeur</th>
                <th>nb min J</th>
                <th>nb max J</th>
                <th>durée</th>
                <th>prototype ?</th>
            </tr>
            </thead>
            <tbody>

            {games.map(game => (
                <tr>
                    <td>{game.id}</td>
                    <td>{game.editor}</td>
                    <td>{game.minNumberPlayer}</td>
                    <td>{game.maxNumberPlayer}</td>
                    <td>{game.duration}</td>
                    <td>No</td>
                </tr>
            ))}
            </tbody>
        </Table>

    )
}

export default GamesOld


