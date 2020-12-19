import { createContext, useReducer } from "react";

const initialState = {
  defaultValue: "Harshit is the default value",
  audioMute: false,
  myAudio: {},
  myImages: {},
  settings: {
    timer: "",
    timeEndNotification: false,
    showTimerOnBrowser: false,
    webNotification: false,
    sessions: 4,
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

      case "set sessions":
        return {
          ...state,
          settings: { ...state.settings, sessions: action.value },
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
