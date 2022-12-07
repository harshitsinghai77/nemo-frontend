import { useContext } from "react";

import Timer from "../components/Timer";
import Sounds from "../components/Sounds";

import { store } from "../store/store";
import { TOGGLE_MUTE } from "../store/types";
// import { InputTaskWhatAreYouWorkingOn } from "../components/TaskInput";

function Dashboard() {
  const globalState = useContext(store);
  const mute = globalState.state.audioMute || false;
  const myAudio = globalState.state.myAudio;

  const onMuteClickToggle = () => {
    const { dispatch } = globalState;
    dispatch({ type: TOGGLE_MUTE });

    for (const audio of Object.values(myAudio)) {
      audio.currentAudio.muted = !audio.currentAudio.muted;
    }
  };

  return (
    <div id="#dashboard" className="dashboard">
      <Timer />
      <div className="flex-container">
        {/* <Introduction /> */}
        {/* <div className="current-task bubble">
          <InputTaskWhatAreYouWorkingOn />
        </div> */}
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
