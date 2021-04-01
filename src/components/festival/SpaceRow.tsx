import {BsPencilSquare} from "react-icons/bs";
import {Festival, Space} from "../../utils/types";
import {FC, useContext, useState} from "react";
import {AiOutlineCheckSquare} from "react-icons/ai"
import {useAxiosMethods} from "../../utils/axios-hooks";
import {FestivalContext} from "./Festivals";

const SpaceRow: FC<{ space: Space, festival:Festival }> = ({space, festival}) => {

    const {festivals, setFestivals} = useContext(FestivalContext)

    const [onUpdate, setOnUpdate] = useState<boolean>(false)

    const [label, setLabel] = useState<string>(space.label)
    const [tablePrice, setTablePrice] = useState<number>(space.tablePrice)
    const [meterPrice, setMeterPrice] = useState<number>(space.meterPrice)
    const [tableTotal, setTableTotal] = useState<number>(space.tableTotal)
    const [tableRemaining, setTableRemaining] = useState<number>(space.tableRemaining)

    const oldTableTotal: number = space.tableTotal
    const oldTableRemaining: number = space.tableRemaining

    const {put} = useAxiosMethods("spaces")

    const handleChange = set => event => {
        set(event.target.value)
    }

    const handleChangeTableTotal = event => {
        console.log("nouveau setTable total")
        console.log(event.target.value)
        setTableTotal(event.target.value)
        setTableRemaining(oldTableRemaining+(event.target.value-oldTableTotal))
        console.log("oldTableRemaining")
        console.log(oldTableRemaining)
        console.log("différence")
        console.log(tableTotal - oldTableTotal)
        console.log("tableRemaining")
        console.log(tableRemaining)
    }

    const handleModification = async () => {

        const modifiedSpace: Space = {
            id: space.id,
            label,
            meterPrice,
            tablePrice,
            tableRemaining,
            tableTotal
        }

        await put({space: modifiedSpace})

        const listFestival: Festival[] = [...festivals]
        const indexFestival: number = listFestival.findIndex(f => f.id === festival.id)
        const indexSpace: number = listFestival[indexFestival].spaces.findIndex(s => s.id === modifiedSpace.id)
        listFestival[indexFestival].spaces[indexSpace] = modifiedSpace
        setFestivals([...listFestival])

        setOnUpdate(false)

    }

    return (
        <tr>
            {!onUpdate &&
            <>
                <td>{space.label}</td>
                <td>{space.tablePrice} €</td>
                <td>{space.meterPrice} €</td>
                <td>{space.tableTotal}</td>
                <td>{space.tableRemaining}</td>
                <td><BsPencilSquare onClick={() => setOnUpdate(true)}/></td>
            </>
            }
            {onUpdate &&
                <>
                    <td>
                        <input
                            className="small-input"
                            type="text"
                            required
                            value={label}
                            placeholder={"nom du l'espace"}
                            onChange={handleChange(setLabel)}
                        />
                    </td>
                    <td>
                        <input
                            className="small-input"
                            type="number"
                            required
                            value={tablePrice}
                            placeholder={"prix d'une table"}
                            onChange={handleChange(setTablePrice)}
                        />
                    </td>
                    <td>
                        <input
                            className="small-input"
                            type="number"
                            required
                            value={meterPrice}
                            placeholder={"prix du mètre carré"}
                            onChange={handleChange(setMeterPrice)}
                        />
                    </td>
                    <td>
                        <input
                            className="small-input"
                            type="number"
                            required
                            placeholder={"nombre total de table"}
                            value={tableTotal}
                            onChange={handleChangeTableTotal}
                        />
                    </td>
                    <td>
                        <input
                            className="small-input"
                            type="number"
                            required
                            placeholder={"nombre total de table"}
                            value={tableRemaining}
                            disabled
                        />
                    </td>
                    <td>
                        <AiOutlineCheckSquare onClick={handleModification}/>
                    </td>
                </>
            }

        </tr>
    )
}

export default SpaceRow
