import {useState} from "react";
import axios from "../../utils/axios";
import {Button, Form} from "react-bootstrap";

const Home = () => {

    const [file, setFile] = useState<File>();
    const [isSent, setIsSent] = useState<boolean>(false)

    const handleChange = event => {
        setFile(event.currentTarget.files[0])
    }

    const handleSubmit = event => {
        event.preventDefault();

        const formData: FormData = new FormData();
        formData.append("file", file, file.name);

        axios.post("games/photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(() => setIsSent(true))
            .catch(err => console.log(err.message))
    }

    const handleClick = () => {
        axios.post("games/test")
            .then(({data}) => console.log(data))
    }

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <div>
                    <Form.File onChange={handleChange}/>
                </div>

                <div>
                    <Button type="submit" variant="primary">Valider</Button>
                </div>
            </Form>

            {isSent && <div>Envoyé</div>}

            <button type="button" onClick={handleClick}>Click</button>
        </div>
    )
}

export default Home;
