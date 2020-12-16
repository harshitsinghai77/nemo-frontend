import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./views/dashboard";
import Settings from "./views/settings";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
