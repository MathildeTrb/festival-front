import FestivalList from "./FestivalList";
import useFetch from "../Utilities/useFetch";

const Home = () => {

    const {data: festivals, isPending, error} = useFetch("http://localhost:8000/festivals")


    return (
        <div className="home">
            <h2>Choisir un festival</h2>
            {error && <div>{ error }</div>}
            {isPending && <div>Loading...</div>}
            {festivals && <FestivalList festivals={festivals}/>}
        </div>
    );
}

export default Home;