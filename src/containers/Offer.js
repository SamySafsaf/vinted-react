import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Offer = () => {
    const { _id } = useParams();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                "https://lereacteur-vinted-api.herokuapp.com/offers"
            );
            setData(response.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return isLoading ? (
        <div>En cours de chargement...</div>
    ) : (
        data.offers.map((one, index) => {
            return (
                <div key={index}>
                    {one._id === _id && (
                        <div>
                            {one.product_image.secure_url && (
                                <img
                                    src={one.product_image.secure_url}
                                    alt="offer"
                                />
                            )}
                            <div>
                                <div>
                                    <span>{one.product_price} €</span>
                                    <div>
                                        Marque :
                                        {one.product_details[0]["MARQUE"]}
                                    </div>
                                    {one.product_details[1]["TAILLE"] ? (
                                        <div>
                                            <div>
                                                Taille
                                                {
                                                    one.product_details[1][
                                                        "TAILLE"
                                                    ]
                                                }
                                            </div>
                                            <div>
                                                État
                                                {one.product_details[2]["ÉTAT"]}
                                            </div>
                                            <div>
                                                Couleur
                                                {
                                                    one.product_details[3][
                                                        "COULEUR"
                                                    ]
                                                }
                                            </div>
                                            <div>
                                                EMPLACEMENT{" "}
                                                {
                                                    one.product_details[4][
                                                        "EMPLACEMENT"
                                                    ]
                                                }
                                            </div>
                                            <div>
                                                Modes de paiement{" "}
                                                <span>
                                                    Carte bancaire, Paypal
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div>
                                                État{" "}
                                                {one.product_details[1]["ÉTAT"]}
                                            </div>
                                            <div>
                                                Couleur{" "}
                                                {
                                                    one.product_details[2][
                                                        "COULEUR"
                                                    ]
                                                }
                                            </div>
                                            <div>
                                                EMPLACEMENT{" "}
                                                {
                                                    one.product_details[3][
                                                        "EMPLACEMENT"
                                                    ]
                                                }
                                            </div>
                                            <div>
                                                Modes de paiement{" "}
                                                <span>
                                                    Carte bancaire, Paypal
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Pull Zara tout ça
                                 */}
                            </div>
                        </div>
                    )}
                </div>
            );
        })
    );
};

export default Offer;
