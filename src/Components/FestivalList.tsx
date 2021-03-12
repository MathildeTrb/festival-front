import {useState} from "react";

const FestivalList = ({festivals}) => {


    return(
        <div className="festival-list">
            {festivals.map(festival => (
                <div className="festival-preview" key={festival.id_festival} >
                    <div>
                        <input type="radio" name="festival" value={ festival.name_festival }></input>
                        <label >  { festival.name_festival }</label>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FestivalList;