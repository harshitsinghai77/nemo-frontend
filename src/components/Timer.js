import { useState, useEffect, useContext } from "react";
import { Clock } from "grommet";

import { store } from "../store/store";
import apiClient from "../apiClient";
import { SET_CURRENT_SESSION } from "../store/types";
import { webNotifyMe } from "../js/notification";
import { stringToClock } from "../js/utils";
import TitleComponent from "./TitleComponent";
import AlertBox from "./Alertbox";
import { play, pause } from "../components/svg";

import "../css/timer.css";

const pokemonAudio = new Audio(require(`../sounds/pokemon.mp3`).default);

const Timer = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const {
    timer_show_timer_on_browser_tab,
    timer_time,
    display_time,
    current_session,
    timer_sessions,
  } = globalState.state.settings;

  const [clockTimer, setClockTimer] = useState("T00:45:00");
  const [tabTitle, setTabTitle] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(timer_time);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const setDefaultTimer = () => {
      const clockString = stringToClock(display_time);
      setClockTimer(clockString);
    };

    setDefaultTimer();
  }, [display_time]);

  const save_analytics = async () => {
    const analytics = {
      duration: Number(timer_time),
    };
    await apiClient.save_analytics(analytics);
  };

  const reset = () => {
    setIsActive(false);
    playPokemonAudio();
    resetTimer();
    setTabTitle("");
    setCounter(timer_time);
    setShowAlert(true);
    setSessions();
    webNotifyMe();
    save_analytics();
  };

  const resetTimer = () => {
    const clockString = stringToClock(display_time);
    setClockTimer("");
    setClockTimer(clockString);
  };

  const setSessions = () => {
    let sessionValue;
    if (current_session + 1 >= timer_sessions) {
      sessionValue = 0;
    } else {
      sessionValue = current_session + 1;
    }
    dispatch({
      type: SET_CURRENT_SESSION,
      value: sessionValue,
    });
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

  const onClockChange = (timer) => {
    if (timer === "T0:0:0") {
      reset();
      return;
    }

    if (timer_show_timer_on_browser_tab && isActive) {
      let titleStr = timer.replace("T", "") + " Remaining";
      setTabTitle(titleStr);
    }
  };

  const onChangeActive = () => {
    if (isActive) {
      return setIsActive(false);
    }
    setIsActive("backward");
  };

  return (
    <>
      <TitleComponent title={tabTitle} />
      <div className="timer-container-left">
        <div className="timer-container-total-cycle">
          {current_session}/{timer_sessions}
        </div>
      </div>
      <div className="timer-container-center">
        <div className="timer-container-countdown">
          <Clock
            type="digital"
            run={isActive}
            time={clockTimer}
            onChange={onClockChange}
          />
        </div>
      </div>
      <div className="timer-container-right-reset" onClick={onChangeActive}>
        {isActive ? play : pause}
      </div>

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
