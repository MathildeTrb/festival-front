import {useContext} from "react";
import {FestivalContext} from "../../App";
import useAxios from "../../utils/useAxios";
import {ExhibitorMonitoring, Festival} from "../../utils/types";
import {ProgressBar, Spinner} from "react-bootstrap";


const ProgressionPeopleContacted = () =>{

    const {selectedFestival} = useContext(FestivalContext);

    const {data: peopleContacted, isPending, setData :setPeopleContacted} = useAxios<ExhibitorMonitoring[]>(`exhibitorMonitorings/festival/${selectedFestival.id}/peopleContacted`)
    const {data: peopleNotContacted, isPending: isPendingBis, setData: setPeopleNotContacted} = useAxios<ExhibitorMonitoring[]>(`exhibitorMonitorings/festival/${selectedFestival.id}/peopleNotContacted`)


    return(
        <div>
            {isPendingBis || isPending && <Spinner animation="border" variant="primary"/>}
            {peopleNotContacted && peopleContacted &&
                <div>
                    <h5>Progression personne(s) contactée(s)</h5>
                    <ProgressBar now={(peopleContacted.length/(peopleNotContacted.length + peopleContacted.length))*100}/>
                </div>
            }
        </div>
    )


}
export default ProgressionPeopleContacted;
