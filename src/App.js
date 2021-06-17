import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { store } from "./store/store";
import { SET_AUDIO } from "./store/types";

import Dashboard from "./views/dashboard";
import Settings from "./views/settings/settings";
import GoogleSignIn from "./views/google_signin";
import { LoadSound } from "./js/utils";
import { run } from "./js/noisli";

function App() {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const { currentColor } = globalState.state.settings;

  useEffect(() => {
    const audioDict = LoadSound();
    dispatch({ type: SET_AUDIO, payload: audioDict });
  }, []);

  useEffect(() => {
    run(currentColor);
  }, [currentColor]);

  return (
    <Router>
      <Switch>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/login">
          <GoogleSignIn />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
