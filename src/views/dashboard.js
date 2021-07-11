import { useContext, useEffect, useState } from "react";

import { getToken } from "../tokenStorage";
import apiClient from "../apiClient";
import { store } from "../store/store";
import {
  SET_SETTING_LOADED_FROM_BACKEND,
  SET_SETTINGS,
  TOGGLE_MUTE,
} from "../store/types";

import Header from "../components/Header";
import Timer from "../components/Timer";
import Sounds from "../components/Sounds";
import Introduction from "../components/Introduction";
import { CustomSpinner } from "../components/Elements";

function Dashboard() {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const mute = globalState.state.audioMute || false;
  const myAudio = globalState.state.myAudio;
  const { timer_settings_loaded_from_backend } = globalState.state.settings;
  const { profile_pic } = globalState.state.userAccount;
  const [loader, setLoader] = useState(true);

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
      setLoader(false);
    }
  };

  useEffect(() => {
    // if settings not loaded from backend
    if (!getToken() || !timer_settings_loaded_from_backend) {
      setLoader(false);
      return;
    }
    if (getToken() && timer_settings_loaded_from_backend) {
      getSettings();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMuteClickToggle = () => {
    const { dispatch } = globalState;
    dispatch({ type: TOGGLE_MUTE });

    for (const audio of Object.values(myAudio)) {
      audio.muted = !audio.muted;
    }
  };

  const onMusicStop = () => {
    if (myAudio) {
      for (const audio of Object.values(myAudio)) {
        audio.muted = true;
      }
    }
  };

  return (
    <div id="#dashboard" className="dashboard">
      <Header profile_pic={profile_pic}>
        {loader ? (
          <CustomSpinner color="#ffffff" />
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
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Dashboard;
