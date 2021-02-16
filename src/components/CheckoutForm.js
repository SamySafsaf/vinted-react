import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();

    const [display, setDisplay] = useState(false);

    const offer = location.state.data;

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            // I recover account data from the user to transmit them to Stripe
            const carElements = elements.getElement(CardElement);
            // here i do a request to the Stripe's API to get the holy token

            const stripeResponse = await stripe.createToken(carElements, {
                name: offer.owner._id,
            });
            // In the response that they gave us, we are interested by the token to confirm later with the backend
            const stripeToken = stripeResponse.token.id;
            // Request to backend
            const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/payment",
                {
                    token: stripeToken,
                    title: offer.product_name,
                    amount: 1.5 + offer.product_price,
                }
            );
            if (response.status === 200) {
                setDisplay(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return !display ? (
        <div className="payment">
            <div className="container-payment">
                <h4>Résumé de la commande</h4>
                <div className="payment-infos">
                    Commande <span>{offer.product_price} €</span>
                </div>
                <div className="payment-infos">
                    Frais de protection acheteurs <span>0.50 €</span>
                </div>
                <div className="payment-infos just-before-total">
                    Frais de port <span>1,00 €</span>
                </div>
                {/* <hr class="solid">Si tu veux planter le code décommente ça :) </hr> */}
                <div className="payment-infos total-payment">
                    Total <span>{1.5 + offer.product_price} €</span>
                </div>
                <p>
                    Il ne vous reste plus qu'une étape pour vous offrir
                    <span> {offer.product_name}</span>. Vous allez payer
                    <span> {1.5 + offer.product_price}</span> € (frais de
                    protection et frais de port inclus).
                </p>
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    backgroundColor: "#EAEDEE",
                                    lineHeight: "50px",
                                },
                            },
                        }}
                    />
                    <button type="submit">Acheter</button>
                </form>
            </div>
        </div>
    ) : (
        <div>Paiement réussi ! </div>
    );
};

export default CheckoutForm;
