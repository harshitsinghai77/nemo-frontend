import { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { store } from "./store/store";
import { SET_AUDIO } from "./store/types";
import { getToken } from "./tokenStorage";
import { LoadSound } from "./js/utils";
// import { run } from "./js/nemo";

import Dashboard from "./views/dashboard";
import Settings from "./views/settings/settings";
import GoogleSignIn from "./views/google_signin";
import Lofi from "./views/lofi";

function App() {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  // const { preference_background_color, preference_shuffle_time } =
  //   globalState.state.settings;

  useEffect(() => {
    const audioDict = LoadSound();
    dispatch({ type: SET_AUDIO, payload: audioDict });
  }, [dispatch]);

  // useEffect(() => {
  //   run(preference_background_color, preference_shuffle_time);
  // }, [preference_background_color, preference_shuffle_time]);

  function isLoggedIn(WrapperComponent, url) {
    return (props) => {
      if (!getToken()) return <Redirect noThrow to={url || "/login"} />;
      return <WrapperComponent {...props} />;
    };
  }

  function checkedLogedIn(WrapperComponent) {
    return (props) => {
      if (getToken()) return <Redirect noThrow to={`/`} />;
      return <WrapperComponent {...props} />;
    };
  }

  return (
    <Router>
      <Switch>
        <Route path="/settings">{isLoggedIn(Settings)}</Route>
        <Route path="/login">{checkedLogedIn(GoogleSignIn)}</Route>
        <Route path="/lofi">{Lofi}</Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
