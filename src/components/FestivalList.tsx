

const FestivalList = ({festivals}) => {

    return (
        <div className="festival-list">
            {festivals.map(festival => (
                <div className="festival-preview" key={festival.id}>
                    <div>
                        <input type="radio" name="festival" value={festival.name}/>
                        <label>{festival.name}</label>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FestivalList;
