import { useEffect } from "react";
import { Link } from "react-router-dom";
import hero from "../images/hero.jpg";
const Home = ({ fetchData, filteredOffers, setFilteredOffers, isLoading }) => {
    useEffect(() => {
        fetchData();
    }, []);
    return isLoading ? (
        <div>En cours de chargement...</div>
    ) : (
        <div className="body">
            <img src={hero} alt="hero" />
            <div className="onHero">
                <p>Prêt à faire du tri dans vos placards ?</p>
                <button>Commencer à vendre</button>
            </div>
            <div className="all-offers">
                {filteredOffers.offers.map((item, _id) => {
                    return (
                        <div key={item._id} className="home-page">
                            <div>
                                <div className="div-avatar">
                                    {item.owner.account.avatar ? (
                                        <div>
                                            <img
                                                src={
                                                    item.owner.account.avatar
                                                        .secure_url
                                                }
                                                alt="avatar"
                                            />
                                            <span>
                                                {item.owner.account.username}
                                            </span>
                                        </div>
                                    ) : (
                                        <span>
                                            {item.owner.account.username}
                                        </span>
                                    )}
                                </div>

                                <Link
                                    to={`/offer/${item._id}`}
                                    className="link-offer"
                                >
                                    <img
                                        src={item.product_image.secure_url}
                                        alt=""
                                    />
                                    <div className="price">
                                        <span>{item.product_price} €</span>{" "}
                                    </div>
                                    {item.product_details.map(
                                        (details, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="link-details"
                                                >
                                                    {details.TAILLE && (
                                                        <div>
                                                            {details.TAILLE}
                                                        </div>
                                                    )}
                                                    <div>{details.MARQUE}</div>
                                                </div>
                                            );
                                        }
                                    )}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Home;
