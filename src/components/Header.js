import { Link } from "react-router-dom";
import logo from "../images/logo-vinted.png";

const Header = ({ setUser, userToken, fetchData, filters, setFilters }) => {
    const handleSearch = (e) => {
        const newFilters = { ...filters };
        newFilters.title = e.target.value;
        setFilters(newFilters);
        fetchData(
            newFilters.title,
            filters.priceMin,
            filters.priceMax,
            filters.sort,
            filters.skip,
            filters.limit
        );
    };

    // const handleSort = (e) => {
    //     const newSort = { ...filters };
    //     newSort.sort === "price-asc"
    //         ? (newSort.sort = "price-desc")
    //         : (newSort.sort = "price-asc");
    //     setFilters(newSort);
    //     fetchData(
    //         filters.title,
    //         filters.priceMin,
    //         filters.priceMax,
    //         newSort.sort,
    //         filters.skip,
    //         filters.limit
    //     );
    // };

    // const handlePriceMin = (e) => {
    //     const newPriceMin = { ...filters };
    //     newPriceMin.priceMin = e.target.value;
    //     setFilters(newPriceMin);
    //     fetchData(
    //         filters.title,
    //         newPriceMin.priceMin,
    //         filters.priceMax,
    //         filters.sort,
    //         filters.skip,
    //         filters.limit
    //     );
    // };

    // const handlePriceMax = (e) => {
    //     const newPriceMax = { ...filters };
    //     newPriceMax.priceMax = e.target.value;
    //     setFilters(newPriceMax);
    //     fetchData(
    //         filters.title,
    //         filters.priceMin,
    //         newPriceMax.priceMax,
    //         filters.sort,
    //         filters.skip,
    //         filters.limit
    //     );
    // };
    return (
        <div>
            {userToken ? (
                <div className="header-deco">
                    <Link to="/">
                        <img src={logo} alt="logo-vinted" />
                    </Link>
                    <div>
                        <input
                            type="text"
                            name="search-bar"
                            placeholder="Rechercher des articles"
                            onChange={handleSearch}
                        />
                        {/* <div>
                            <p>Trier par prix : </p>
                            <div onClick={handleSort}>SORT</div>
                        </div> */}
                        {/* <div>
                            <input
                                type="text"
                                placeholder="prix mini"
                                onChange={handlePriceMin}
                            />
                            <input
                                type="text"
                                placeholder="prix max"
                                onChange={handlePriceMax}
                            />
                        </div> */}
                    </div>

                    <button onClick={() => setUser(null)}>
                        Se déconnecter
                    </button>
                    <div className="links">
                        <Link to="/publish">Vends tes articles</Link>
                    </div>
                </div>
            ) : (
                <div className="header-log">
                    <Link to="/">
                        <img src={logo} alt="logo-vinted" />
                    </Link>
                    <input
                        type="text"
                        name="search-bar"
                        placeholder="Rechercher des articles"
                        onChange={handleSearch}
                    />
                    <div className="links">
                        <Link className="link1" to="/login">
                            Se connecter
                        </Link>
                        <Link className="link1" to="/signup">
                            S'inscrire
                        </Link>
                        <Link to="/login">Vends tes articles</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
