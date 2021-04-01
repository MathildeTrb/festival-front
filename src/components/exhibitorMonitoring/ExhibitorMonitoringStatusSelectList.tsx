import {ExhibitorMonitoring, ExhibitorMonitoringStatus} from "../../utils/types";
import {FC, useEffect, useState} from "react";
import Select from 'react-select'
import axios from "../../utils/axios";

type Option = {
    value: string;
    label: string
}

const ExhibitorMonitoringStatusSelectList: FC<{ exhibitorMonitoring: ExhibitorMonitoring, setShowModal: (boolean) => void, exhibitorMonitoringStatusTab: ExhibitorMonitoringStatus[], status: ExhibitorMonitoringStatus }> = ({
         exhibitorMonitoring,
         setShowModal,
         exhibitorMonitoringStatusTab,
        status
    }) => {

    const options: Option[] = []

    const defaultValue: Option = {
        value: JSON.stringify(exhibitorMonitoring.status),
        label: exhibitorMonitoring.status.label
    }

    useEffect(() => {
        if (exhibitorMonitoringStatusTab) {
            exhibitorMonitoringStatusTab.forEach(exhibitorMonitoringStatus => {
                options.push({
                    value: JSON.stringify(exhibitorMonitoringStatus),
                    label: exhibitorMonitoringStatus.label
                })
            })
        }
    }, [exhibitorMonitoring, exhibitorMonitoringStatusTab, options])

    const handleChange = (selectedOption: Option) => {
        const status = JSON.parse(selectedOption.value)
        exhibitorMonitoring.status = status
        axios.put("exhibitorMonitorings/status",
            {'exhibitorMonitoring': exhibitorMonitoring}
            )
        if (status.label === "Présence confirmée" && !exhibitorMonitoring.reservation){
            setShowModal(true)
        }
    }

    return (
        <div>
            <Select
                defaultValue={status}
                onChange={handleChange}
                options={options}
            />
        </div>
    )
}

export default ExhibitorMonitoringStatusSelectList
