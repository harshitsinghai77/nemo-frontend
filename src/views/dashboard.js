import { useContext } from "react";
import { TextInput } from "grommet";

import Timer from "../components/Timer";
import Sounds from "../components/Sounds";

import { store } from "../store/store";
import { TOGGLE_MUTE, SET_CURRENT_TASK } from "../store/types";

function Dashboard() {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const mute = globalState.state.audioMute || false;
  const myAudio = globalState.state.myAudio;
  const currentTask = globalState.state.currentTask;

  const onMuteClickToggle = () => {
    const { dispatch } = globalState;
    dispatch({ type: TOGGLE_MUTE });

    for (const audio of Object.values(myAudio)) {
      audio.currentAudio.muted = !audio.currentAudio.muted;
    }
  };

  const onCurrentTaskChange = (e) => {
    dispatch({ type: SET_CURRENT_TASK, value: e.target.value });
  };

  return (
    <div id="#dashboard" className="dashboard">
      <Timer />
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
