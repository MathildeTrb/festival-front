import {useEffect, useState} from "react";
import axios from "./axios";

const useAxios = <T>(url: string) => {

    const [data, setData] = useState<T>(null);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get<T>(url)
            .then(({data}) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message)
            })
    }, [url])

    return {data, setData, isPending, error};
}

/*const useAxiosMethods = (url: string, body: any, withToken: boolean = false) => {



    const post = () => {
        axios.post(url, body, )
    }
}*/

export default useAxios
