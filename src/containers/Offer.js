import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Offer = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
    };
  });
};

export default Offer;
