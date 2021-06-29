import { useContext, useEffect } from "react";

import apiClient from "../apiClient";
import { store } from "../store/store";
import { SET_SETTING_LOADED_FROM_BACKEND, SET_SETTINGS } from "../store/types";

import Header from "../components/Header";
import Timer from "../components/Timer";
import Sounds from "../components/Sounds";
import Introduction from "../components/Introduction";
import Footer from "../components/Footer";
import { CustomSpinner } from "../components/Elements";

function Dashboard() {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const mute = globalState.state.audioMute || false;
  const myAudio = globalState.state.myAudio;
  const { timer_settings_loaded_from_backend } = globalState.state.settings;

  const getSettings = async () => {
    const res = await apiClient.get_settings();
    const { data } = res;
    if (data) {
      dispatch({
        type: SET_SETTINGS,
        value: data,
      });
      dispatch({
        type: SET_SETTING_LOADED_FROM_BACKEND,
        value: !timer_settings_loaded_from_backend,
      });
    }
  };

  useEffect(() => {
    // if settings not loaded from backend
    if (timer_settings_loaded_from_backend) {
      getSettings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer_settings_loaded_from_backend]);

  const onMuteClickToggle = () => {
    const { dispatch } = globalState;
    dispatch({ type: "toggle mute" });

    for (const [key, audio] of Object.entries(myAudio)) {
      audio.muted = !audio.muted;
    }
  };

  const onMusicStop = () => {
    if (myAudio) {
      for (const [key, audio] of Object.entries(myAudio)) {
        audio.muted = true;
      }
    }
  };

  return (
    <div id="#dashboard" className="dashboard">
      <Header>
        {timer_settings_loaded_from_backend ? (
          <CustomSpinner color="white" />
        ) : (
          <Timer onMusicStop={onMusicStop} />
        )}
      </Header>
      <div className="flex-container">
        <Introduction />

        <button
          className={
            mute
              ? "fa fa-volume-off active btn-mute dashboard-button"
              : "fa fa-volume-up active btn-mute dashboard-button"
          }
          title="Mute/Unmute"
          onClick={() => onMuteClickToggle()}
        ></button>

        <Sounds />
        {/* <div id="buttons" className="flex-item">
        <button id="btn-random">Random</button>
        <button id="btn-productivity">Productivity</button>
        <button id="dbtn-relax">Relax</button>
      </div> */}

        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
