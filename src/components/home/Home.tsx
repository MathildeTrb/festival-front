import {useState} from "react";
import {Hint} from "react-autocomplete-hint";
import useAxios from "../../utils/useAxios";
import {Company, Festival} from "../../utils/types";
import {IHintOption} from "react-autocomplete-hint/dist/src/IHintOption";
import AreaList from "../area/AreaList";

const Home = () => {
    const [text, setText] = useState<string>("")

    const {data: companies, isPending} = useAxios<Company[]>("companies");

    const {data: currentFestival} = useAxios<Festival>("festivals/current/games")

    const handleChange = event => {
        console.log(event)
        setText(event.target.value)
    }

    return (
        <div>
            {currentFestival &&
            <p>{currentFestival.areas.map(area => <p>{area.label} : {area.games.length}</p>)}</p>
            }
            {/*{isPending && <div>Chargement...</div>}
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

            Text {text}*/}

        </div>
    )
}

export default Home;
