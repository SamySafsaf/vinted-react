import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
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
    data.offers.map((item, _id) => {
      return (
        <div key={item._id}>
          <div>
            {item.owner.account.avatar ? (
              <div>
                <img src={item.owner.account.avatar.secure_url} alt="avatar" />
                <span>{item.owner.account.username}</span>
              </div>
            ) : (
              <span>{item.owner.account.username}</span>
            )}
          </div>
          <Link to={`/offer/${item._id}`}>
            <img src={item.product_image.secure_url} alt="" />
            <div>
              <span>{item.product_price} €</span> <span></span>
            </div>
            {item.product_details.map((details, index) => {
              return (
                <div key={index}>
                  {details.TAILLE && <div>{details.TAILLE}</div>}
                  <div>{details.MARQUE}</div>
                </div>
              );
            })}
          </Link>
        </div>
      );
    })
  );
};
export default Home;
