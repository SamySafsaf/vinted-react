import { Link } from "react-router-dom";

const Header = ({ setUser, userToken }) => {
    return (
        <div>
            {userToken ? (
                <button onClick={() => setUser(null)}>Se déconnecter</button>
            ) : (
                <div>
                    <Link to="/login">Se connecter</Link>
                    <Link to="/signup">S'inscrire</Link>
                </div>
            )}
        </div>
    );
};

export default Header;
