import axios from "./axios";

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
