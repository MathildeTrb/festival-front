import { useState } from "react";

const FestivalList = ({festivals}) => {

    const [festival, setFestival] = useState<string>(null);

    const handleChange = event => {
        setFestival(event.target.value)
        console.log(festival)
    }

    return (
        <div className="festival-list">

            {festivals.map(festival => (
                <div className="festival-preview" key={festival.id}>
                    <div>
                        <input type="radio" name="festival" value={festival.name} onChange={handleChange}/>
                        <label>{festival.name}</label>
                    </div>
                </div>
            ))}

            { festival !== null && <div>{festival} sélectionné</div>}

        </div>
    )
}

export default FestivalList;
