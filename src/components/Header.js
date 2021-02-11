import { Link } from "react-router-dom";
import logo from "../images/logo-vinted.png";
const Header = ({ setUser, userToken }) => {
    return (
        <div>
            {userToken ? (
                <div className="header-deco">
                    <img src={logo} alt="logo-vinted" />
                    <button onClick={() => setUser(null)}>
                        Se déconnecter
                    </button>
                </div>
            ) : (
                <div className="header-log">
                    <Link to="/">
                        <img src={logo} alt="logo-vinted" />
                    </Link>
                    <input type="search-bar" />
                    <div className="links">
                        <Link className="link1" to="/login">
                            Se connecter
                        </Link>
                        <Link to="/signup">S'inscrire</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
