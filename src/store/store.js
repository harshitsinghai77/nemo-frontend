import { type } from "language-tags";
import { createContext, useReducer } from "react";
import * as types from "./types";

const initialState = {
  audioMute: false,
  myAudio: {},
  myImages: {},
  settings: {
    timer: "45 : 00",
    countdownValue: 2700,
    timeEndNotification: true,
    showTimerOnBrowser: true,
    webNotification: false,
    workInSession: false,
    shortBreak: "00:05:00",
    longBreak: "00:15:00",
    currentSession: 0,
    totalSessions: 4,
    autoStart: false,
    breakEndNotification: false,
  },
  user: {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
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
          settings: { ...state.settings, timer: action.value },
        };

      case types.TOGGLE_TIME_END_NOTIFICION:
        return {
          ...state,
          settings: { ...state.settings, timeEndNotification: action.value },
        };

      case types.TOGGLE_TIMER_ON_BROWSER:
        return {
          ...state,
          settings: { ...state.settings, showTimerOnBrowser: action.value },
        };

      case types.TOGGLE_WEB_NOTIFICATION:
        return {
          ...state,
          settings: { ...state.settings, webNotification: action.value },
        };

      case types.SET_TOTAL_SESSION:
        return {
          ...state,
          settings: { ...state.settings, totalSessions: action.value },
        };

      case types.SET_CURRENT_SESSION:
        return {
          ...state,
          settings: { ...state.settings, currentSession: action.value },
        };

      case types.SET_COUNTDOWN:
        return {
          ...state,
          settings: { ...state.settings, countdownValue: action.value },
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
          settings: { ...state.settings, autoStart: action.value },
        };
      case types.TOGGLE_BREAK_END_NOTIFICATION:
        return {
          ...state,
          settings: { ...state.settings, breakEndNotification: action.value },
        };

      case types.SET_USERNAME:
        return {
          ...state,
          user: { ...state.user, username: action.value },
        };

      case types.SET_EMAIL:
        return {
          ...state,
          user: { ...state.user, email: action.value },
        };

      case types.SET_FIRST_NAME:
        return {
          ...state,
          user: { ...state.user, firstName: action.value },
        };

      case types.SET_LAST_NAME:
        return {
          ...state,
          user: { ...state.user, lastName: action.value },
        };

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
