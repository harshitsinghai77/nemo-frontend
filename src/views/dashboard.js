import { useContext, useEffect, useState } from "react";
import { TextInput } from "grommet";

import Header from "../components/Header";
import Timer from "../components/Timer";
import Sounds from "../components/Sounds";
// import Introduction from "../components/Introduction";
import { CustomSpinner } from "../components/Elements";

import { getToken, getUserImage, setUserImage } from "../tokenStorage";
import apiClient from "../apiClient";
import { store } from "../store/store";
import {
  SET_SETTING_LOADED_FROM_BACKEND,
  SET_SETTINGS,
  TOGGLE_MUTE,
  SET_CURRENT_TASK,
} from "../store/types";

function Dashboard() {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const mute = globalState.state.audioMute || false;
  const myAudio = globalState.state.myAudio;
  const currentTask = globalState.state.currentTask;
  const { timer_settings_loaded_from_backend } = globalState.state.settings;
  const [loader, setLoader] = useState(true);
  const [profilepic, setProfilepic] = useState();

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

  const loadImage = async () => {
    // Check localStorage if userImageURL is already available.
    const userImageURL = getUserImage();
    if (userImageURL) {
      // If available in localStorage, set it as profile_pic
      setProfilepic(userImageURL);
    } else {
      // If not available, ,ake a request and get userimage from API
      const resp = await apiClient.get_user_image_url();
      if (resp.data) {
        const { profile_pic } = resp.data;
        setProfilepic(profile_pic);

        // Save it to localstorage for future reference
        setUserImage(profile_pic);
      }
    }
  };

  useEffect(() => {
    // if settings not loaded from backend
    if (!getToken() || !timer_settings_loaded_from_backend) {
      setLoader(false);
    }
    if (getToken() && timer_settings_loaded_from_backend) {
      getSettings();
      loadImage();
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

  const onCurrentTaskChange = (e) => {
    dispatch({ type: SET_CURRENT_TASK, value: e.target.value });
  };

  return (
    <div id="#dashboard" className="dashboard">
      <Header profile_pic={profilepic}>
        {loader ? (
          <CustomSpinner color="#ffffff" />
        ) : (
          <Timer onMusicStop={onMusicStop} />
        )}
      </Header>
      <div className="flex-container">
        {/* <Introduction /> */}
        <div className="current-task bubble">
          <TextInput
            placeholder="What are you working on?"
            value={currentTask}
            onChange={onCurrentTaskChange}
            focusIndicator={false}
            plain
          />
        </div>
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
