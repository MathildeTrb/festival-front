import {useEffect, useState} from "react";
import axios from "./axios";
import useToken from "./useToken";
import set = Reflect.set;

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

export const useAxiosPost = (url: string, body: any, withToken: boolean = false) => {

    const [data, setData] = useState();
    const [error, setError] = useState(null)
    const {token} = useToken();

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }

    useEffect(() => {
        axios.post(url, body, withToken ? config : {})
            .then(({data}) => {
                setData(data);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
            })
    })

    return {
        data,
        setData,
        error
    }
}

export default useAxios
