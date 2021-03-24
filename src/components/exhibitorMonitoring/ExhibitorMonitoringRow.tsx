import {FC, useState} from "react";
import {ExhibitorMonitoring} from "../../utils/types";
import {ImCalendar} from "react-icons/im"
import "../../css/sample.css"
import CalendarModal from "./CalendarModal";
import axios from "../../utils/axios";
import useToken from "../../utils/useToken";

const ExhibitorMonitoringRow: FC<{ exhibitorMonitoring: ExhibitorMonitoring }> = ({exhibitorMonitoring}) => {

    const {token} = useToken();

    const [date1, setDate1] = useState<Date>(exhibitorMonitoring.dateContact1 ? new Date(exhibitorMonitoring.dateContact1) : null);
    const [date2, setDate2] = useState<Date>(exhibitorMonitoring.dateContact2 ? new Date(exhibitorMonitoring.dateContact2) : null);
    const [date3, setDate3] = useState<Date>(exhibitorMonitoring.dateContact3 ? new Date(exhibitorMonitoring.dateContact3) : null);

    const [showModal1, setShowModal1] = useState<boolean>(false);
    const [showModal2, setShowModal2] = useState<boolean>(false);
    const [showModal3, setShowModal3] = useState<boolean>(false);

    const onValidate = async () => {
        exhibitorMonitoring.dateContact1 = date1;
        exhibitorMonitoring.dateContact2 = date2;
        exhibitorMonitoring.dateContact3 = date3;
        axios.put(
            "exhibitorMonitorings",
            {'exhibitorMonitoring': exhibitorMonitoring},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }
        );
    }

    return (
        <tr>
            <td>{exhibitorMonitoring.exhibitor.name}</td>
            <td>
                <ImCalendar
                    onClick={() => setShowModal1(true)}/> {exhibitorMonitoring.dateContact1 ? new Date(exhibitorMonitoring.dateContact1).toLocaleDateString() : <>Pas de 1<sup>er</sup> contact</>}
                <CalendarModal show={showModal1} onHide={() => setShowModal1(false)} date={date1} setDate={setDate1}
                               onValidate={onValidate}/>
            </td>
            <td>
                <ImCalendar
                    onClick={() => setShowModal2(true)}/> {exhibitorMonitoring.dateContact2 ? new Date(exhibitorMonitoring.dateContact2).toLocaleDateString() : <>Pas de 2<sup>e</sup> contact</>}
                <CalendarModal show={showModal2} onHide={() => setShowModal2(false)} date={date2} setDate={setDate2}
                               onValidate={onValidate}/>
            </td>
            <td>
                <ImCalendar
                    onClick={() => setShowModal3(true)}/> {exhibitorMonitoring.dateContact3 ? new Date(exhibitorMonitoring.dateContact3).toLocaleDateString() : <>Pas de 3<sup>e</sup> contact</>}
                <CalendarModal show={showModal3} onHide={() => setShowModal3(false)} date={date3} setDate={setDate3}
                               onValidate={onValidate}/>
            </td>
            <td>{exhibitorMonitoring.status.label}</td>
            <td>{exhibitorMonitoring.reservation ? exhibitorMonitoring.reservation.id : "Pas de réservation"}</td>
        </tr>

    )
}

export default ExhibitorMonitoringRow;
