import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        //requête axios pour s'inscrire (normalement body = avec email username phone et password)
        try {
            const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                {
                    email: email,
                    username: username,
                    phone: phone,
                    password: password,
                }
            );
            setUser(response.data.token);
            history.push("/");
        } catch (error) {
            return error.message;
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Téléphone"
                    onChange={(event) => setPhone(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <div>
                    <input type="checkbox" name="newsletter" />
                    <label>S'inscrire à notre newsletter</label>
                </div>
                <p>
                    En m'inscrivant je confirme avoir lu et accepté les Termes &
                    Conditions et Politique de Confidentialité de Vinted. Je
                    confirme avoir au moins 18 ans.
                </p>
                <button type="submit">S'inscrire</button>
            </form>
            <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
        </div>
    );
};

export default Signup;
