import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Offer from "./containers/Offer";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="https://lereacteur-vinted-api.herokuapp.com/offers/:id">
            <Offer />
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
