import {useState} from "react";
import Calendar from "react-calendar"
import "../../css/sample.css"

const Home = () => {

    const [date, setDate] = useState(new Date())

    const onChange = date => {
        setDate(date)
    }

    return (
        <div className="container">
            <Calendar onChange={onChange} value={date}/>
            {console.log(date)}
        </div>
    )
}

export default Home;
