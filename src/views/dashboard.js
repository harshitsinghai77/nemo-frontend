import { useContext, useState, useEffect } from "react";

import Timer from "../components/Timer";
import Sounds from "../components/Sounds";

import { store } from "../store/store";
import { TOGGLE_MUTE } from "../store/types";
// import { InputTaskWhatAreYouWorkingOn } from "../components/TaskInput";

function Dashboard() {
  const globalState = useContext(store);
  const mute = globalState.state.audioMute || false;
  const myAudio = globalState.state.myAudio;
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  const onMuteClickToggle = () => {
    const { dispatch } = globalState;
    dispatch({ type: TOGGLE_MUTE });

    for (const audio of Object.values(myAudio)) {
      audio.currentAudio.muted = !audio.currentAudio.muted;
    }
  };

  useEffect(() => {
    const bgImage = new Image();
    bgImage.src = require("../images/stacked-waves-haikei.svg").default;
    bgImage.onload = () => setIsBackgroundLoaded(true);
  }, []);

  return (
    <div id="#dashboard" className="dashboard">
      {/* <Introduction /> */}
      {/* <div className="current-task bubble">
          <InputTaskWhatAreYouWorkingOn />
        </div> */}
      {isBackgroundLoaded && (
        <>
          <Timer />
          <div className="flex-container">
            <button
              className={
                mute
                  ? "fa fa-volume-off active btn-mute dashboard-button"
                  : "fa fa-volume-up active btn-mute dashboard-button"
              }
              title="Mute/Unmute"
              onClick={onMuteClickToggle}
            ></button>
            <Sounds />
          </div>
        </>
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default Dashboard;
