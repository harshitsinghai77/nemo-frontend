import { createContext, useReducer } from "react";

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
    currentSession: 0,
    totalSessions: 4,
  },
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "action description":
        return { ...state, defaultValue: "Hello World" };

      case "toggle mute":
        return { ...state, audioMute: !state.audioMute };

      case "set audio":
        return { ...state, myAudio: action.payload };

      case "set timer":
        return {
          ...state,
          settings: { ...state.settings, timer: action.value },
        };

      case "set time end notification":
        return {
          ...state,
          settings: { ...state.settings, timeEndNotification: action.value },
        };

      case "set timer on browser":
        return {
          ...state,
          settings: { ...state.settings, showTimerOnBrowser: action.value },
        };

      case "set web notification":
        return {
          ...state,
          settings: { ...state.settings, webNotification: action.value },
        };

      case "set total session":
        return {
          ...state,
          settings: { ...state.settings, totalSessions: action.value },
        };

      case "set current session":
        return {
          ...state,
          settings: { ...state.settings, currentSession: action.value },
        };

      case "set countdown":
        return {
          ...state,
          settings: { ...state.settings, countdownValue: action.value },
        };

      case "toggle activate image":
        return {
          ...state,
          myImages: {
            ...state.myImages,
            [action.title]: !state.myImages[action.title],
          },
        };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
