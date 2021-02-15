import { Link } from "react-router-dom";
import logo from "../images/logo-vinted.png";

const Header = ({ setUser, userToken, fetchData, filters, setFilters }) => {
    const handleSearch = (e) => {
        const newFilters = { ...filters };
        newFilters.title = e.target.value;
        setFilters(newFilters);
        fetchData(newFilters.title);
    };

    return (
        <div>
            {userToken ? (
                <div className="header-deco">
                    <Link to="/">
                        <img src={logo} alt="logo-vinted" />
                    </Link>
                    <input
                        type="text"
                        name="search-bar"
                        placeholder="Rechercher des articles"
                        onChange={handleSearch}
                    />
                    <button onClick={() => setUser(null)}>
                        Se déconnecter
                    </button>
                    <Link to="/publish">Vends tes artciles</Link>
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
                        <Link to="/login">Vends tes articles</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
