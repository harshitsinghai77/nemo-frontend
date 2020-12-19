import { createContext, useReducer } from "react";

const initialState = {
  defaultValue: "Harshit is the default value",
  audioMute: false,
  myAudio: {},
  imageActive: {},
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

      case "toggle activate image":
        return {
          ...state,
          imageActive: {
            ...state.imageActive,
            [action.title]: !state.imageActive[action.title],
          },
        };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
