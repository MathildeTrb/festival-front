import {FC, useState} from "react";
import {ExhibitorMonitoring, ExhibitorMonitoringStatus} from "../../utils/types";
import {ImCalendar} from "react-icons/im"
import "../../css/sample.css"
import CalendarModal from "./CalendarModal";
import axios from "../../utils/axios";
import useToken from "../../utils/useToken";
import useAxios from "../../utils/useAxios";
import ExhibitorMonitoringStatusSelectList from "./ExhibitorMonitoringStatusSelectList";
import ModalCreateReservation from "../reservation/ModalCreateReservation";
import {HiOutlineDocumentSearch} from "react-icons/hi"
import ModalDetailsReservation from "../reservation/ModalDetailsReservation";
import {Link} from "react-router-dom";
import {BsPencilSquare} from "react-icons/bs";
import ExhibitorMonitoringUpdateModal from "./ExhibitorMonitoringUpdateModal";


const ExhibitorMonitoringRow:
    FC<{ exhibitorMonitoring: ExhibitorMonitoring }> = ({exhibitorMonitoring}) => {

    const [date1, setDate1] = useState<Date>(exhibitorMonitoring.dateContact1 ? new Date(exhibitorMonitoring.dateContact1) : null);
    const [date2, setDate2] = useState<Date>(exhibitorMonitoring.dateContact2 ? new Date(exhibitorMonitoring.dateContact2) : null);
    const [date3, setDate3] = useState<Date>(exhibitorMonitoring.dateContact3 ? new Date(exhibitorMonitoring.dateContact3) : null);

    const [showModal1, setShowModal1] = useState<boolean>(false);
    const [showModal2, setShowModal2] = useState<boolean>(false);
    const [showModal3, setShowModal3] = useState<boolean>(false);

    const [showModalStatus, setShowModalStatus] = useState<boolean>(false);

    const [showDetailsReservation, setShowDetailsReservation] = useState<boolean>(false);

    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);

    const {data: exhibitorMonitoringStatusTab} = useAxios<ExhibitorMonitoringStatus[]>("exhibitorMonitoringStatus")

    const onValidate = async () => {
        exhibitorMonitoring.dateContact1 = date1;
        exhibitorMonitoring.dateContact2 = date2;
        exhibitorMonitoring.dateContact3 = date3;
        if (exhibitorMonitoring.status.label === "Pas contacté") {
            exhibitorMonitoring.status = exhibitorMonitoringStatusTab.filter(e => e.label === "En discussion")[0]
        }
        axios.put(
            "exhibitorMonitorings/date",
            {'exhibitorMonitoring': exhibitorMonitoring}
        );
    }

    return (

        <tr>
            <td><Link to={`/dashboard/${exhibitorMonitoring.exhibitor.id}`}>{exhibitorMonitoring.exhibitor.name}</Link></td>
            <td>
                <ImCalendar
                    onClick={() => setShowModal1(true)}/> {exhibitorMonitoring.dateContact1 ? new Date(exhibitorMonitoring.dateContact1).toLocaleDateString() : <>Pas
                de 1<sup>er</sup> contact</>}
                <CalendarModal title="Sélection de la date du premier contact" show={showModal1}
                               onHide={() => setShowModal1(false)} date={date1} setDate={setDate1}
                               onValidate={onValidate}/>
            </td>
            <td>
                <ImCalendar
                    onClick={() => setShowModal2(true)}/> {exhibitorMonitoring.dateContact2 ? new Date(exhibitorMonitoring.dateContact2).toLocaleDateString() : <>Pas
                de 2<sup>e</sup> contact</>}
                <CalendarModal title="Sélection de la date du deuxième contact" show={showModal2}
                               onHide={() => setShowModal2(false)} date={date2} setDate={setDate2}
                               onValidate={onValidate}/>

            </td>
            <td>
                <ImCalendar
                    onClick={() => setShowModal3(true)}/> {exhibitorMonitoring.dateContact3 ? new Date(exhibitorMonitoring.dateContact3).toLocaleDateString() : <>Pas
                de 3<sup>e</sup> contact</>}
                <CalendarModal title="Sélection de la date du troisième contact" show={showModal3}
                               onHide={() => setShowModal3(false)} date={date3} setDate={setDate3}
                               onValidate={onValidate}/>
            </td>
            <td>
                {exhibitorMonitoring.comment ? exhibitorMonitoring.comment : "Pas de commentaire"}
            </td>
            <td>
                <ExhibitorMonitoringStatusSelectList exhibitorMonitoring={exhibitorMonitoring}
                                                     setShowModal={setShowModalStatus}
                                                     exhibitorMonitoringStatusTab={exhibitorMonitoringStatusTab}/>
                <ModalCreateReservation show={showModalStatus} onHide={() => setShowModalStatus(false)}
                                        exhibitorMonitoring={exhibitorMonitoring}/>
            </td>
            <td>{exhibitorMonitoring.reservation ?
                <>
                    <HiOutlineDocumentSearch onClick={() => setShowDetailsReservation(true)}/>
                    <ModalDetailsReservation show={showDetailsReservation}
                                             onHide={() => setShowDetailsReservation(false)}
                                             reservation={exhibitorMonitoring.reservation}/>
                </>
                :
                "Pas de reservation"}</td>
            <td>
                <BsPencilSquare className="p-cursor" onClick={() => setShowModalUpdate(true)}/>
                <ExhibitorMonitoringUpdateModal show={showModalUpdate} onHide={() => setShowModalUpdate(false)} exhibitorMonitoring={exhibitorMonitoring}/>
            </td>
        </tr>

    )
}

export default ExhibitorMonitoringRow;
