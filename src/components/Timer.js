import { useState, useEffect, useContext } from "react";

import Countdown from "./countdown";
import AlertBox from "./Alertbox";

import { store } from "../store/store";
import apiClient from "../apiClient";
import { SET_CURRENT_SESSION, SET_CURRENT_TASK } from "../store/types";
import { webNotifyMe } from "../js/notification";

import "../css/timer.css";

const pokemonAudio = new Audio(
  "https://storage.googleapis.com/todobase-2770f.appspot.com/nemo-sounds/Pok%C3%A9mon%20Theme%20Song%20Trap%20Remix.mp3"
);

const Timer = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const { timer_time, current_session, timer_sessions } =
    globalState.state.settings;
  const { currentTask } = globalState.state;

  const [expiryTimestamp, setExpiryTimestamp] = useState();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    resetTimer();
  }, [timer_time]);

  const resetTimer = () => {
    const currentTime = new Date();
    currentTime.setSeconds(currentTime.getSeconds() + Number(timer_time));
    setExpiryTimestamp(currentTime);
  };

  const clearTask = () => {
    dispatch({
      type: SET_CURRENT_TASK,
      value: "",
    });
  };

  const setSessions = () => {
    let sessionValue;
    if (current_session + 1 >= timer_sessions) {
      sessionValue = timer_sessions;
    } else {
      sessionValue = current_session + 1;
    }
    dispatch({
      type: SET_CURRENT_SESSION,
      value: sessionValue,
    });
  };

  const send_analytics_and_task_to_backend = async () => {
    const analytics = {
      duration: Number(timer_time),
    };
    await apiClient.save_analytics(analytics);
    // Make this API call only if user has defined the task.
    if (currentTask) {
      const currentTime = new Date();
      const task = {
        created_at: currentTime.toISOString(),
        task_date: currentTime.toDateString(),
        task_description: currentTask,
        duration: Number(timer_time),
      };
      await apiClient.save_task(task);
      clearTask();
    }
  };

  const expireTimer = () => {
    setShowAlert(true);
    playPokemonAudio();
    send_analytics_and_task_to_backend();
    setSessions();
    webNotifyMe();
    resetTimer();
  };

  const playPokemonAudio = () => {
    if (pokemonAudio) {
      pokemonAudio.play();
    }
  };

  const stopPokemonAudio = () => {
    if (pokemonAudio && pokemonAudio.played) {
      pokemonAudio.pause();
      pokemonAudio.currentTime = 0;
    }
  };

  return (
    <>
      {expiryTimestamp && (
        <Countdown
          expiryTimestamp={expiryTimestamp}
          current_session={current_session}
          timer_sessions={timer_sessions}
          currentTask={currentTask}
          onExpire={expireTimer}
        />
      )}

      <AlertBox
        show={showAlert}
        onClose={() => {
          setShowAlert(false);
          stopPokemonAudio();
        }}
      />
    </>
  );
};

export default Timer;
