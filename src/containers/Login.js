import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/user/login",
            {
                email: email,
                password: password,
            }
        );
        setUser(response.data.token);
        history.push("/");
    };

    return (
        <div>
            <h2>Se connecter</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Adresse email"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Se connecter</button>
            </form>
            <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
        </div>
    );
};

export default Login;
