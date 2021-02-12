import "./App.scss";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";

import Offer from "./containers/Offer";
import Home from "./containers/Home";
import Header from "./components/Header";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
function App() {
    const [userToken, setUserToken] = useState(
        Cookies.get("userToken") || null
    );
    const setUser = (token) => {
        if (token) {
            Cookies.set("userToken", token, { expires: 3 });
            setUserToken(token);
        } else {
            Cookies.remove("userToken");
            setUserToken(null);
        }
    };
    return (
        <div className="App">
            <Router>
                <Header userToken={userToken} setUser={setUser} />
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
                    <Route>
                        <Home path="/" />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
