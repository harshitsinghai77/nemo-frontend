import { useState, useEffect, useContext, useCallback } from "react";

import Countdown from "./countdown";
import AlertBox from "./Alertbox";

import { store } from "../store/store";
import apiClient from "../apiClient";
import { SET_CURRENT_SESSION, SET_CURRENT_TASK, SET_ANALYTICS, SET_TASKS } from "../store/types";
// import { webNotifyMe } from "../js/notification";

import "../css/timer.css";

const pokemonAudio = new Audio(
  "https://storage.googleapis.com/todobase-2770f.appspot.com/nemo-sounds/Pok%C3%A9mon%20Theme%20Song%20Trap%20Remix.mp3"
);

const Timer = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const { timer_time, current_session, timer_sessions } = globalState.state.settings;
  const { analyticsData } = globalState.state.analytics;
  const { tasksData } = globalState.state.tasks;
  const { currentTask } = globalState.state;

  const [expiryTimestamp, setExpiryTimestamp] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const resetTimer = useCallback(() => {
    const currentTime = new Date();
    currentTime.setSeconds(currentTime.getSeconds() + Number(timer_time));
    setExpiryTimestamp(currentTime);
  }, [timer_time]);

  useEffect(() => {
    resetTimer();
  }, [timer_time, resetTimer]);

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

  const getUpdateAnalyticsState = (newDuration) => {
    // Get today’s date in the desired format (e.g., "January 12")
    const today = new Date();
    const options = { month: "long", day: "2-digit" };
    const todayWeekday = today.toLocaleDateString("en-US", options);

    const existingDataIndex = analyticsData.findIndex(
      (entry) => entry.weekday === todayWeekday
    );

    if (existingDataIndex !== -1) {
      // Update the existing entry
      const updatedAnalytics = [...analyticsData];
      updatedAnalytics[existingDataIndex].total_count += newDuration;
      return updatedAnalytics;
    } else {
      // Add a new entry for today
      return [
        ...analyticsData,
        {
          weekday: todayWeekday,
          total_count: newDuration,
          month_number: today.getMonth() + 1, // Month is 0-indexed
        },
      ];
    }
  }

  const sendAnalyticsTaskToBackend = async () => {
    const analytics = {
      duration: Number(timer_time),
    };
    let response = await apiClient.save_analytics(analytics);
    if (response && response.status === 200) {
      // Update local store only on success
      const updatedLocalAnalyticsStore = {
        analyticsData: getUpdateAnalyticsState(Number(timer_time)),
      };
      dispatch({
        type: SET_ANALYTICS,
        value: updatedLocalAnalyticsStore,
      });
    }

    // Make this API call only if user has defined the task.
    if (currentTask) {
      const currentTime = new Date();
      const task = {
        created_at: currentTime.toISOString(),
        task_date: currentTime.toDateString(),
        task_description: currentTask,
        duration: Number(timer_time),
      };
      response = await apiClient.save_task(task);
      if (response && response.status === 200) {
        // Update local store only on success
        const newTask = response?.data
        newTask['date'] = new Date(newTask.created_at).toLocaleDateString("en-US", {month: "short", day: "2-digit", year: "numeric" }).replace(",", "");;
        
        dispatch({
          type: SET_TASKS,
          value: {'tasksData': [newTask, ...tasksData]},
        });
      }
      clearTask();
    }
  };

  const expireTimer = () => {
    setShowAlert(true);
    playPokemonAudio();
    sendAnalyticsTaskToBackend();
    setSessions();
    // webNotifyMe();
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
