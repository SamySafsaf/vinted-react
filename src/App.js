import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Offer from "./containers/Offer";
import Home from "./containers/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route path="/offers/:id">
            <Offer />
          </Route> */}
          <Route>
            <Home path="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
