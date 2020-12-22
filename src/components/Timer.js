import { useState, useEffect, useContext } from "react";

import { store } from "../store/store";
import { webNotifyMe } from "../js/notification";
import { numberToMinute, numberToSeconds } from "../js/utils";
import TitleComponent from "./TitleComponent";
import AlertBox from "./Alertbox";

import "../css/timer.css";

const pokemonAudio = new Audio(require(`../sounds/pokemon.mp3`).default);

const Timer = (props) => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const { onMusicStop } = props;

  const {
    showTimerOnBrowser,
    countdownValue,
    timer,
    currentSession,
    totalSessions,
  } = globalState.state.settings;

  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(45);
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(countdownValue || 2700);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        if (counter === 0) {
          reset();
          return;
        }

        const secondCounter = numberToSeconds(counter);
        const minuteCounter = numberToMinute(counter);
        setSecond(secondCounter);
        setMinute(minuteCounter);
        setCounter((counter) => counter - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  useEffect(() => {
    setDefaultTimer();
  }, []);

  const setDefaultTimer = () => {
    try {
      const globalTimer = timer.split(" : ");
      const globalTimerMin = globalTimer[0];
      const globalTimerSec = globalTimer[1];
      setMinute(globalTimerMin);
      setSecond(globalTimerSec);
    } catch (e) {
      setMinute(45);
      setSecond(0);
    }
  };

  const reset = () => {
    playPokemonAudio();
    setIsActive(false);
    setDefaultTimer();
    setCounter(countdownValue || 2700);
    setShowAlert(true);
    webNotifyMe();
    setSessions();
  };

  const setSessions = () => {
    dispatch({
      type: "set current session",
      value: currentSession + 1,
    });
  };

  const playPokemonAudio = () => {
    if (pokemonAudio) {
      pokemonAudio.volume = 20 / 100;
      pokemonAudio.play();
    }
  };

  const stopPokemonAudio = () => {
    if (pokemonAudio && pokemonAudio.played) {
      pokemonAudio.pause();
      pokemonAudio.currentTime = 0;
    }
  };

  const getHeaderTitle = () => {
    if (counter < 2) return "Time's up";
    else if (showTimerOnBrowser && isActive)
      return `${minute}:${second} Remaining`;
    return "";
  };

  return (
    <>
      <TitleComponent title={getHeaderTitle()} />
      <div className="timer-container-left">
        <div className="timer-container-total-cycle">
          {currentSession}/{totalSessions}
        </div>
      </div>
      <div className="timer-container-center">
        <div className="timer-container-countdown">
          {minute} : {second === 0 ? "00" : second}
        </div>
      </div>
      <div
        className="timer-container-right-reset"
        onClick={() => setIsActive((prevState) => !prevState)}
      >
        {isActive ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
          >
            <g fill="none" fillRule="evenodd">
              <path
                fill="currentColor"
                fillRule="nonzero"
                d="M3 1a1 1 0 1 1 2 0v12a1 1 0 0 1-2 0V1zm6 0a1 1 0 1 1 2 0v12a1 1 0 0 1-2 0V1z"
              ></path>
              <path d="M0 0h14v14H0z"></path>
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
          >
            <g fill="none" fillRule="evenodd">
              <path
                fill="currentColor"
                fillRule="nonzero"
                d="M5 2.869v8.262L11.197 7 5 2.869zm8.555 4.963l-9 6A1 1 0 0 1 3 13V1A1 1 0 0 1 4.555.168l9 6a1 1 0 0 1 0 1.664z"
              ></path>
              <path d="M0 0h14v14H0z"></path>
            </g>
          </svg>
        )}
      </div>

      <AlertBox
        show={showAlert}
        onClose={() => {
          setShowAlert(false);
          stopPokemonAudio();
          onMusicStop();
        }}
      />
    </>
  );
};

export default Timer;
