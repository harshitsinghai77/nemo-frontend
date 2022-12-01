import { useContext, useEffect, useState } from "react";

import Header from "../components/Header";
import TimerComponent from "../components/TimerComponent";
import { CustomSpinner } from "../components/Elements";

import {
  getToken,
  getUserImage,
  setUserImage,
  removeToken,
  removeUserImage,
} from "../tokenStorage";
import apiClient from "../apiClient";
import { store } from "../store/store";
import { SET_SETTING_LOADED_FROM_BACKEND, SET_SETTINGS } from "../store/types";

function Timer() {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const myAudio = globalState.state.myAudio;
  const { timer_settings_loaded_from_backend } = globalState.state.settings;
  const [loader, setLoader] = useState(true);
  const [profilepic, setProfilepic] = useState();

  const getSettings = () => {
    apiClient
      .get_settings()
      .then((res) => {
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
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          // Could not validate credentials
          removeToken();
          removeUserImage();
          if (window) {
            window.location.reload();
          }
        }
      });
  };

  //   const requestAnalytics = async () => {
  //     // Create a request to analytics, so that it can be cached by the database,
  //     // this will result in faster query and response time when the request is made in the
  //     // in the analytics page
  //     await apiClient.get_analytics();
  //   };

  const loadImage = async () => {
    // Check localStorage if userImageURL is already available.
    const userImageURL = getUserImage();
    if (userImageURL) {
      // If available in localStorage, set it as profile_pic
      setProfilepic(userImageURL);
    } else {
      // If not available, make a request and get userimage from API
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
      //   requestAnalytics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMusicStop = () => {
    if (myAudio) {
      for (const audio of Object.values(myAudio)) {
        audio.muted = true;
      }
    }
  };

  return (
    <Header profile_pic={profilepic}>
      {loader ? (
        <CustomSpinner color="#ffffff" />
      ) : (
        <TimerComponent onMusicStop={onMusicStop} />
      )}
    </Header>
  );
}

export default Timer;
