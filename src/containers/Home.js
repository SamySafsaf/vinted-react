import axios from "axios";
import { useState, useEffect } from "react";

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
      console.log(response.data);
    };
    fetchData();
  }, []);
  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    data.offers.map((item, id) => {
      return (
        <div key={item.id}>
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
        </div>
      );
    })
  );
};
export default Home;
