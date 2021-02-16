import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const Offer = () => {
    const { _id } = useParams();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `https://lereacteur-vinted-api.herokuapp.com/offer/${_id}`
            );
            setData(response.data);
            setIsLoading(false);
        };
        fetchData();
    }, [_id]);

    return isLoading ? (
        <div>En cours de chargement...</div>
    ) : (
        <div className="offer-container">
            <div className="div-img-offer">
                {data.product_image.secure_url && (
                    <img src={data.product_image.secure_url} alt="offer" />
                )}
            </div>
            <div className="div-name-description">
                <span>{data.product_price} €</span>
                <ul>
                    {data.product_details.map((e, i) => {
                        const keys = Object.keys(e);
                        return (
                            <div>
                                <li className="brand-offer">{keys[0]}</li>
                                <li>{e[keys[0]]}</li>
                            </div>
                        );
                    })}
                </ul>
                <div>
                    <h3>{data.product_name}</h3>
                    <p>{data.product_description}</p>
                    <div>
                        {data.owner.account.avatar && (
                            <img
                                src={data.owner.account.avatar.secure_url}
                                alt="avatar"
                            />
                        )}
                        <span>{data.owner.account.username}</span>
                    </div>
                </div>
                <Link
                    className="link"
                    to={{
                        pathname: "/payment",
                        state: {
                            _id: _id,
                            data: data,
                        },
                    }}
                >
                    Acheter
                </Link>
            </div>
        </div>
    );
};

export default Offer;
