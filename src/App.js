import "./App.scss";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import Offer from "./containers/Offer";
import Home from "./containers/Home";
import Header from "./components/Header";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Publish from "./containers/Publish";
function App() {
    const [userToken, setUserToken] = useState(
        Cookies.get("userToken") || null
    );
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        title: "",
        priceMin: "",
        priceMax: "",
        sort: "",
        skip: "",
        limit: "",
    });
    const [filteredOffers, setFilteredOffers] = useState([]);

    const setUser = (token) => {
        if (token) {
            Cookies.set("userToken", token, { expires: 3 });
            setUserToken(token);
        } else {
            Cookies.remove("userToken");
            setUserToken(null);
        }
    };

    const fetchData = async (title, priceMin, priceMax, sort, skip, limit) => {
        try {
            let url = "https://lereacteur-vinted-api.herokuapp.com/offers?";

            if (title) {
                url = `${url}title=${title}&`;
            }
            if (priceMin) {
                url = `${url}priceMin=${priceMin}&`;
            }
            if (priceMax) {
                url = `${url}priceMax=${priceMax}$`;
            }
            if (sort) {
                url = `${url}sort=${sort}&`;
            }
            if (skip) {
                url = `${url}skip=${skip}&`;
            }
            if (limit) {
                url = `${url}limit=${limit}&`;
            }
            url.substring(0, url.length - 1);
            const response = await axios.get(url);
            setFilteredOffers(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="App">
            <Router>
                <Header
                    userToken={userToken}
                    setUser={setUser}
                    filters={filters}
                    setFilters={setFilters}
                    fetchData={fetchData}
                />
                <Switch>
                    <Route path="/offer/:_id">
                        <Offer />
                    </Route>
                    <Route path="/login">
                        <Login setUser={setUser} />
                    </Route>
                    <Route path="/signup">
                        <Signup setUser={setUser} />
                    </Route>
                    <Route path="/publish">
                        <Publish setUser={setUser} userToken={userToken} />
                    </Route>
                    <Route path="/">
                        <Home
                            fetchData={fetchData}
                            filteredOffers={filteredOffers}
                            setFilteredOffers={setFilteredOffers}
                            isLoading={isLoading}
                        />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
