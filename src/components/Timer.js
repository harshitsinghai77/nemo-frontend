import { useState, useEffect, useContext, useCallback } from "react";

import { store } from "../store/store";
import apiClient from "../apiClient";
import { SET_CURRENT_SESSION } from "../store/types";
import { webNotifyMe } from "../js/notification";
import TitleComponent from "./TitleComponent";
import AlertBox from "./Alertbox";
import { play, pause } from "../components/svg";
import { secToHourMinuteSecond } from "../js/utils";

import "../css/timer.css";

const pokemonAudio = new Audio(
  "https://nemo-cdn-audio.s3.amazonaws.com/pokemon.mp3"
);

const Timer = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const { timer_time, current_session, timer_sessions } =
    globalState.state.settings;

  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(5);

  const [tabTitle, setTabTitle] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const [hour, min, sec] = secToHourMinuteSecond(timer_time);
    setHours(hour);
    setMinutes(min);
    setSeconds(sec);
  }, [timer_time]);

  const reset = useCallback(() => {
    const save_analytics = async () => {
      const analytics = {
        duration: Number(timer_time),
      };
      await apiClient.save_analytics(analytics);
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

    setIsActive(false);
    playPokemonAudio();
    save_analytics();
    setTabTitle("");
    setShowAlert(true);
    setSessions();
    webNotifyMe();
  }, [current_session, dispatch, timer_sessions, timer_time]);

  useEffect(() => {
    if (!isActive) return;

    let interval = setInterval(() => {
      clearInterval(interval);

      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59);
          setMinutes((minutes) => minutes - 1);
        } else {
          let minutes = 59;
          let seconds = 59;

          setSeconds(seconds);
          setMinutes(minutes);

          if (hours !== 0) {
            setHours((hours) => hours - 1);
          } else {
            reset();
          }
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
  }, [seconds, minutes, hours, isActive, reset]);

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

  const onChangeActive = () => {
    if (isActive) {
      return setIsActive(false);
    }
    setIsActive("backward");
  };

  const timerHours = hours > 0 ? `0${hours}` : "00";
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

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
          {timerHours} : {timerMinutes} : {timerSeconds}
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
