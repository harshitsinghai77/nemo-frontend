import { createContext, useReducer } from "react";
import * as types from "./types";

const initialState = {
  audioMute: false,
  myAudio: {},
  myImages: {},
  settings: {
    // timer_time: "45 : 00",
    timer_time: 2700,
    display_time: "45 : 00 : 00",
    timer_end_notification: false,
    timer_show_timer_on_browser_tab: false,
    timer_web_notification: false,
    shortBreak: "00:05:00",
    longBreak: "00:15:00",
    current_session: 0,
    timer_sessions: 4,
    timer_auto_start: false,
    timer_break_end_notification: false,
    preference_shuffle_time: 10,
    preference_background_color: "rainbow",
    timer_settings_loaded_from_backend: true,
  },
  userAccount: {
    username: "",
    email: "",
    family_name: "",
    given_name: "",
    profile_pic: "",
    user_account_loaded_from_backend: true,
  },
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case types.ACTION_DESCRIPTION:
        return { ...state, defaultValue: "Hello World" };

      case types.TOGGLE_MUTE:
        return { ...state, audioMute: !state.audioMute };

      case types.SET_AUDIO:
        return { ...state, myAudio: action.payload };

      case types.SET_TIMER:
        return {
          ...state,
          settings: { ...state.settings, timer_time: action.value },
        };

      case types.SET_TIMER_DISPLAY:
        return {
          ...state,
          settings: { ...state.settings, display_time: action.value },
        };

      case types.TOGGLE_TIME_END_NOTIFICION:
        return {
          ...state,
          settings: {
            ...state.settings,
            timer_end_notification: action.value,
          },
        };

      case types.TOGGLE_TIMER_ON_BROWSER:
        return {
          ...state,
          settings: {
            ...state.settings,
            timer_show_timer_on_browser_tab: action.value,
          },
        };

      case types.TOGGLE_WEB_NOTIFICATION:
        return {
          ...state,
          settings: { ...state.settings, timer_web_notification: action.value },
        };

      case types.SET_TOTAL_SESSION:
        return {
          ...state,
          settings: { ...state.settings, timer_sessions: action.value },
        };

      case types.SET_CURRENT_SESSION:
        return {
          ...state,
          settings: { ...state.settings, current_session: action.value },
        };

      case types.TOGGLE_ACTIVATE_IMAGE:
        return {
          ...state,
          myImages: {
            ...state.myImages,
            [action.title]: !state.myImages[action.title],
          },
        };

      case types.TOGGLE_WORK_IN_SESSION:
        return {
          ...state,
          settings: { ...state.settings, workInSession: action.value },
        };

      case types.SET_SHORT_BREAK:
        return {
          ...state,
          settings: { ...state.settings, shortBreak: action.value },
        };

      case types.SET_LONG_BREAK:
        return {
          ...state,
          settings: { ...state.settings, longBreak: action.value },
        };
      case types.TOGGLE_AUTO_START:
        return {
          ...state,
          settings: { ...state.settings, timer_auto_start: action.value },
        };
      case types.TOGGLE_BREAK_END_NOTIFICATION:
        return {
          ...state,
          settings: {
            ...state.settings,
            timer_break_end_notification: action.value,
          },
        };
      case types.SET_SETTING_LOADED_FROM_BACKEND:
        return {
          ...state,
          settings: {
            ...state.settings,
            timer_settings_loaded_from_backend: action.value,
          },
        };

      case types.SET_BACKGROUND_COLOR:
        return {
          ...state,
          settings: {
            ...state.settings,
            preference_background_color: action.value,
          },
        };

      case types.SET_BACKGROUND_SHUFFLE_TIME:
        return {
          ...state,
          settings: {
            ...state.settings,
            preference_shuffle_time: action.value,
          },
        };

      case types.SET_USERNAME:
        return {
          ...state,
          userAccount: { ...state.userAccount, username: action.value },
        };

      case types.SET_EMAIL:
        return {
          ...state,
          userAccount: { ...state.userAccount, email: action.value },
        };

      case types.SET_FAMILY_NAME:
        return {
          ...state,
          userAccount: { ...state.userAccount, family_name: action.value },
        };

      case types.SET_GIVEN_NAME:
        return {
          ...state,
          userAccount: { ...state.userAccount, given_name: action.value },
        };

      case types.SET_SETTINGS:
        return {
          ...state,
          settings: { ...state.settings, ...action.value },
        };

      case types.SET_USER_ACCOUNT:
        return {
          ...state,
          userAccount: action.value,
        };

      case types.SET_USER_SETTING_LOADED_FROM_BACKEND:
        return {
          ...state,
          userAccount: {
            ...state.userAccount,
            user_account_loaded_from_backend: action.value,
          },
        };

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
