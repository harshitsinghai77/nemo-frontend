import { useState, useEffect, useContext } from "react";

import TitleComponent from "./TitleComponent";
import AlertBox from "./Alertbox";
import "../css/timer.css";
import { store } from "../context";

const pokemonAudio = new Audio(require(`../sounds/pokemon.mp3`).default);

const Timer = (props) => {
  const globalState = useContext(store);

  const { sessions, showTimerOnBrowser } = globalState.state.settings;

  const [cycle, setCycle] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(45);
  const [started, setStarted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(2700);
  const [showAlert, setShowAlert] = useState(false);

  const { onMuteClickToggle, onMusicStop } = props;

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        if (counter === 0) {
          reset();
          return;
        }

        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        setSecond(secondCounter);
        setMinute(minuteCounter);
        setCounter((counter) => counter - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  const reset = () => {
    onMuteClickToggle();
    playPokemonAudio();
    setCycle((cycle) => cycle + 1);
    setCounter(3);
    setIsActive(false);
    setMinute(45);
    setSecond(0);
    setShowAlert(true);
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

  return (
    <>
      <TitleComponent
        title={
          showTimerOnBrowser && isActive
            ? `Time remaining ${minute}:${second}`
            : "Noisli"
        }
      />
      <div className="timer-container-left">
        <div className="timer-container-total-cycle">
          {cycle}/{sessions}
        </div>
      </div>
      <div className="timer-container-center">
        <div className="timer-container-countdown">
          {minute} : {second === 0 ? "00" : second}
        </div>
      </div>
      <div
        className="timer-container-right-reset"
        onClick={() => {
          if (started) {
            onMuteClickToggle();
          } else {
            setStarted(true);
          }
          setIsActive((prevState) => !prevState);
        }}
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
