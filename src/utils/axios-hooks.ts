import useToken from "./useToken";
import axios from "./axios";
import {useEffect, useState} from "react";

export const useAxios = <T>(url: string) => {

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

    return {
        data,
        setData,
        isPending,
        error
    };
}

export const useAxiosMethods = <T>(url: string, needToken: boolean = false) => {

    const {token} = useToken();

    const headers = needToken ? {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    } : {}


    const post = async (body: any = {}, config?: any) => {

        return (await axios.post<T>(url, body, {
            ...config,
            headers
        })).data;
    }

    const put = async (body: any = {}, config?: any) => {
        return (await axios.put(url, body, {
            ...config,
            headers
        }))
    }

    const deleteMethod = async (param: number, config?: any) => {
        return (await axios.delete(`${url}/${param}`, {
            ...config,
            headers
        }))
    }

    return {
        post,
        put,
        deleteMethod
    }
}

export const useAxiosPhoto = () => {

    const upload = async (file: File) => {

        const formData: FormData = new FormData();
        formData.append("file", file, file.name);

        return (await axios.post<string>("photos", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })).data
    }

    return {
        upload
    }
}
