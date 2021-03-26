import axios from "./axios";
import useToken from "./useToken";

export const useAxiosPost = <T>(url: string, needToken: boolean = false) => {

    const {token} = useToken();

    const headers = needToken ? {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    } : {}

    const post = async (body: any = {}, config?: any) => {

        return (await axios.post<T>(url, body, {
            ...config
        })).data;
    }

    return {
        post
    }
}
