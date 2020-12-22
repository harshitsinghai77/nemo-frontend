import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { store } from "./store/store";
import Dashboard from "./views/dashboard";
import Settings from "./views/settings";
import { LoadSound } from "./js/utils";
import { PageView, initGA } from "./tracking/tracking";
import "./js/noisli";

function App() {
  const globalState = useContext(store);

  useEffect(() => {
    const { dispatch } = globalState;
    const audioDict = LoadSound();

    dispatch({ type: "set audio", payload: audioDict });

    initGA("UA-183777353-1");
    PageView();
  }, []);

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
