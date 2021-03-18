import {useState} from "react";
import {Form} from "react-bootstrap";
import axios from "../../utils/axios";
import {useHistory} from "react-router";
import useToken from "../../utils/useToken";

const Login = () => {

    const {saveToken} = useToken()

    const [mail, setMail] = useState<string>("guillaume@email.com")
    const [password, setPassword] = useState<string>("guigui")

    const history = useHistory();

    const loginUser = credentials => {
        return axios.post("users/login", credentials).then(res => res.data)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            mail,
            password
        });
        console.log("je suis dans login : token = ")
        console.log(token)
        saveToken(token.accessToken)
        if (!history.location.state){
            history.push("/")
        } else {
            history.push(history.location.state.from.pathname)
        }
    }

    return (
        <div className="create">
            <h2>Log In</h2>
            <Form>

                <Form.Group >
                    <Form.Label>Adresse mail</Form.Label>
                    <Form.Control
                        type="email"
                        required
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        placeholder="votre adresse mail"
                    />
                    {/* TODO : remplir valid */}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>

                <button className={"mon-button"} type="submit" onClick={handleSubmit}>
                    Se connecter
                </button>

            </Form>
        </div>
    );
}

export default Login;
