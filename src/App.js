import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { client } from "./apiClient";
import { store } from "./store/store";
import {
  SET_AUDIO,
  SET_SETTING_LOADED_FROM_BACKEND,
  SET_SETTINGS,
} from "./store/types";

import Dashboard from "./views/dashboard";
import Settings from "./views/settings/settings";
import GoogleSignIn from "./views/google_signin";
import { LoadSound } from "./js/utils";
import { run } from "./js/noisli";

function App() {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const { preference_background_color, timer_settings_loaded_from_backend } =
    globalState.state.settings;

  const getSettings = async () => {
    const res = await client.get("/settings");
    const { data } = res;

    dispatch({
      type: SET_SETTINGS,
      value: data,
    });
    dispatch({
      type: SET_SETTING_LOADED_FROM_BACKEND,
      value: !timer_settings_loaded_from_backend,
    });
  };

  useEffect(() => {
    const audioDict = LoadSound();
    dispatch({ type: SET_AUDIO, payload: audioDict });
  }, []);

  useEffect(() => {
    run(preference_background_color);
  }, [preference_background_color]);

  useEffect(() => {
    // if settings not loaded from backend
    if (timer_settings_loaded_from_backend) {
      getSettings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer_settings_loaded_from_backend]);

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
