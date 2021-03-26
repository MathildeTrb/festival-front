import {useState} from "react";
import {Hint} from "react-autocomplete-hint";
import useAxios from "../../utils/useAxios";
import {Company} from "../../utils/types";
import {IHintOption} from "react-autocomplete-hint/dist/src/IHintOption";
import AreaList from "../area/AreaList";

const Home = () => {
    const [text, setText] = useState<string>("")

    const {data: companies, isPending} = useAxios<Company[]>("companies");

    const handleChange = event => {
        console.log(event)
        setText(event.target.value)
    }

    return (
        <div>
            {isPending && <div>Chargement...</div>}
            {companies &&
            <Hint options={companies.map<IHintOption>(company => {
                return {
                    id: company.id,
                    label: company.name
                }
            })}>
                <input type="text" value={text} onChange={handleChange}/>
            </Hint>
            }

            Text {text}

        </div>
    )
}

export default Home;
